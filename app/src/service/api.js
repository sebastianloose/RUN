const superagent = require("superagent");
const baseUrl = "https://api.run.sebastianloose.de";

const encodeTracks = (obj) => {
  for (let i = 0; i < obj.tracks.length; i++) {
    obj.tracks[i].fileContent = atob(
      obj.tracks[i].fileContent.split("base64,")[1]
    );
  }
  return obj;
};

export async function getTracks(uid) {
  try {
    const res = await superagent
      .post(baseUrl + "/getTracks")
      .send({ uid: uid });
    return encodeTracks(res.body);
  } catch (err) {
    console.error(err);
  }
}

export async function uploadTrack(fileObj, fileName, uid) {
  try {
    const res = await superagent
      .post(baseUrl + "/addTrack")
      .send({ fileName: fileName, fileContent: fileObj.content, uid: uid });
    return res.text;
  } catch (err) {
    console.error(err);
  }
}

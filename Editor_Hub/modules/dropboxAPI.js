const { readFile, writeFile, stat } = require("fs/promises");

const refreshToken =
  "K7p3L2kB-ygAAAAAAAAAAY4BpuZaB5vXaKAKfFTGmpIl9r0KU7eo5He7XG9XueO0";

let abortController;

async function generateToken(refreshToken) {
  return await fetch(`https://api.dropbox.com/oauth2/token`, {
    method: "post",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: "ezvsqb5qklsy5h5",
      client_secret: "j5e4s5njjdpb8hl",
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return JSON.stringify(json);
    });
}
async function AccessToken() {
  await checkAccTk(dir.editorHub.jsonFiles.accTk)
    .then(async (isvalid) => {
      if (isvalid == false) {
        return await generateToken(refreshToken);
      }
      return null;
    })
    .then(async (accTk) => {
      if (!accTk) {
        return null;
      }
      await writeFile(global.dir.editorHub.jsonFiles.accTk, accTk);
    })
    .catch((e) => global.hubException(e));
}
async function checkAccTk(filePath) {
  try {
    const fileStats = await stat(filePath);
    const currentTime = new Date().getTime();
    const fileModifiedTime = fileStats.mtime.getTime();
    const timeDifference = currentTime - fileModifiedTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours

    return hoursDifference < 3;
  } catch (e) {
    return false;
  }
}
async function download(uri, dropboxPath) {
  return await readFile(global.dir.editorHub.jsonFiles.accTk, {
    encoding: "utf-8",
  })
    .then(async (accTk) => {
      accTk = JSON.parse(accTk).access_token;
      return await fetch("https://content.dropboxapi.com/2/files/download", {
        method: "post",
        headers: {
          Authorization: `Bearer ${accTk}`,
          "Dropbox-API-Arg": `{"path":"${dropboxPath}"}`,
        },
      });
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((json) => {
          throw new Error(
            `Dropbox download request failed: ${json.error_summary}`
          );
        });
      } else {
        return res.arrayBuffer();
      }
    })
    .then((ab) => Buffer.from(ab))
    .then(async (file) => {
      await writeFile(uri, file, null);
      return true;
    })
    .catch((e) => global.hubException(e));
}
/* Returns a readable stream */
async function streamAudio(audioContext, dropboxPath) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  const { signal } = abortController;

  return await readFile(global.dir.editorHub.jsonFiles.accTk, {
    encoding: "utf-8",
  }).then(async (accTk) => {
    accTk = JSON.parse(accTk).access_token;
    return await fetch("https://content.dropboxapi.com/2/files/download", {
      method: "post",
      headers: {
        Authorization: `Bearer ${accTk}`,
        "Dropbox-API-Arg": JSON.stringify({ path: dropboxPath }),
      },
      signal: signal,
    })
      .then((res) => {
        abortController == null;
        if (!res.ok) {
          throw new Error("something went wrong.");
        }
        return res.arrayBuffer();
      })
      .then(async (arrayBuffer) => {
        let arrayBufferCopy = arrayBuffer.slice();
        let fileBuffer = Buffer.from(arrayBuffer);
        let audioBuffer = await audioContext.decodeAudioData(arrayBufferCopy);
        let bufferObject = {
          audioBuffer: audioBuffer,
          dropboxPath: dropboxPath,
          fileBuffer: fileBuffer,
        };
        return bufferObject;
      })
      .catch((e) => {
        if (e.name == "AbortError") {
          abortController == null;
          return null;
        } else {
          global.hubException(e);
        }
      });
  });
}
/**
 *
 * @param {*} dropboxPath The dropbox path for the target folder
 * @returns A list of dropbox paths for all files in the target folder
 */
async function getFiles(dropboxPath) {
  return await readFile(global.dir.editorHub.jsonFiles.accTk, {
    encoding: "utf-8",
  })
    .then((content) => JSON.parse(content))
    .then((json) => json.access_token)
    .then(async (accTk) => {
      return await fetch("https://api.dropboxapi.com/2/files/list_folder", {
        method: "post",
        headers: {
          Authorization: `Bearer ${accTk}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          include_deleted: false,
          include_has_explicit_shared_members: false,
          include_media_info: false,
          include_mounted_folders: true,
          include_non_downloadable_files: false,
          path: dropboxPath,
          recursive: false,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          // let pathArray = [];
          // for(let i = 0; i < json.entries.length; i++)
          // {
          //     pathArray.push(json.entries[i])
          // }
          json.entries.sort((a, b) => {
            const fileNameA = a.path_display.split("/").pop();
            const fileNameB = b.path_display.split("/").pop();
            return fileNameA.localeCompare(fileNameB);
          });
          return json.entries;
        })
        .catch((e) => global.hubException(e));
    });
}
const dropboxPath = {
  editorHub: {
    folder: {
      modules: {
        root: `/BrianJosephStudio.github.io/Editor_Hub/modules`,
        wp_audioTools: `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_audioTools`,
        wp_footageManager: `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_footageManager`,
        wp_patchNotes: `/BrianJosephStudio.github.io/Editor_Hub/modules/wp_footageManager`,
      },
      jsonFiles: `/BrianJosephStudio.github.io/Editor_Hub/jsonFiles`,
      stats: `/BrianJosephStudio.github.io/Editor_Hub/stats`,
      templates: `/BrianJosephStudio.github.io/Editor_Hub/templates`,
      resources: {
        root: `/BrianJosephStudio.github.io/Editor_Hub/resources`,
        image: `/BrianJosephStudio.github.io/Editor_Hub/resources/image`,
        video: `/BrianJosephStudio.github.io/Editor_Hub/resources/video`,
        music: `/BrianJosephStudio.github.io/Editor_Hub/resources/music`,
        sfx: `/BrianJosephStudio.github.io/Editor_Hub/resources/sfx`,
        ui: `/BrianJosephStudio.github.io/Editor_Hub/resources/ui`,
      },
      styles: `/BrianJosephStudio.github.io/Editor_Hub/modules/styles`,
    },
  },
};
async function upload(fileData, dropboxPath) {
  let accTk = await readFile(global.dir.editorHub.jsonFiles.accTk, {
    encoding: "utf-8",
  });
  accTk = JSON.parse(accTk).access_token;
  return await fetch("https://content.dropboxapi.com/2/files/upload", {
    method: "post",
    headers: {
      Authorization: `Bearer ${accTk}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": JSON.stringify({
        path: dropboxPath,
        mode: "add",
        autorename: false,
        mute: false,
      }),
    },
    body: fileData,
  }).catch((e) => {
    global.hubException(e);
    return false;
  });
}
module.exports = {
  AccessToken,
  download,
  getFiles,
  streamAudio,
  dropboxPath,
  upload,
};

const { readFileSync } = require("fs");
// const { writeFile } = require('fs/promises');
// const { homedir } = require('os');
const audioTools = require(global.dir.editorHub.module.audioTools);
const dropbox = require(global.dir.editorHub.module.dropboxAPI);
const path = require("path");
const resourceAPI = require(global.dir.editorHub.module.resourceAPI);
const settings = require(global.dir.editorHub.module.settings);
const sequence = require(global.dir.editorHub.module.sequenceAPI);
const stat = require(global.dir.editorHub.module.stat);

const listType = {
  sfx: {
    iconClass: "sfxIcon",
    previewClass: "audioPreviewIcon",
    preview: (event) => audioTools.previewAudio(event),
    trackTitle: "sfx",
    trackType: "audio",
  },
  music: {
    iconClass: "musicIcon",
    previewClass: "audioPreviewIcon",
    preview: (event) => audioTools.previewAudio(event),
    trackTitle: "music",
    trackType: "audio",
  },
};
async function buildUI() {
  //CONSTRUCT HTML HEAD
  //Create head elements
  let charset = document.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  /* Import Fonts */
  let font = document.createElement("link");
  font.setAttribute("rel", "stylesheet");
  font.setAttribute(
    "href",
    "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,900;0,100;1,100;0,400;1,400;0,900&display=swap"
  );
  /* Import Base Global Styles */
  let base_style = document.createElement("link");
  base_style.setAttribute("id", "base_style");
  base_style.setAttribute("rel", "stylesheet");
  base_style.setAttribute("href", dir.editorHub.style.base_style);
  /* Import Workspace Layout Styles */
  let wp_style = document.createElement("link");
  wp_style.setAttribute("id", "wp_style");
  wp_style.setAttribute("rel", "stylesheet");
  wp_style.setAttribute("href", dir.editorHub.style.wp_style);
  /* Import UI Styles */
  let ui_style = document.createElement("link");
  ui_style.setAttribute("id", "ui_style");
  ui_style.setAttribute("rel", "stylesheet");
  ui_style.setAttribute("href", dir.editorHub.style.ui_style);
  /* Import Settings styles */
  let settings_style = document.createElement("link");
  settings_style.setAttribute("id", "settings_style");
  settings_style.setAttribute("rel", "stylesheet");
  settings_style.setAttribute("href", dir.editorHub.style.settings_style);
  /* Import Audio Tools Workspace Styles */
  let audioTools_style = document.createElement("link");
  audioTools_style.setAttribute("id", "audioTools_style");
  audioTools_style.setAttribute("rel", "stylesheet");
  audioTools_style.setAttribute("href", dir.editorHub.style.audioTools_style);
  /* Import Patch Notes Styles */
  let patchNotes_style = document.createElement("link");
  patchNotes_style.setAttribute("id", "patchNotes_style");
  patchNotes_style.setAttribute("rel", "stylesheet");
  patchNotes_style.setAttribute("href", dir.editorHub.style.patchNotes_style);
  /* Import footageManager Styles */
  let footageManager_style = document.createElement("link");
  footageManager_style.setAttribute("id", "footageManager_style");
  footageManager_style.setAttribute("rel", "stylesheet");
  footageManager_style.setAttribute(
    "href",
    dir.editorHub.style.footageManager_style
  );
  //Append head elements to head
  let headElement = document.getElementsByTagName("head")[0];
  headElement.appendChild(charset);
  headElement.appendChild(font);
  headElement.appendChild(base_style);
  headElement.appendChild(wp_style);
  headElement.appendChild(ui_style);
  headElement.appendChild(settings_style);
  headElement.appendChild(audioTools_style);
  headElement.appendChild(patchNotes_style);
  headElement.appendChild(footageManager_style);
  //CREATE HTML BODY
  let bodyContent = readFileSync(dir.editorHub.module.htmlBody, {
    encoding: "utf-8",
  });
  let body = document.getElementById("editorHub");
  body.innerHTML = bodyContent;

  /*var testButton = document.getElementById('testButton')
        testButton.addEventListener('click',async () => {
            dropbox.streamAudio(`${dropbox.dropboxPath.editorHub.folder.resources.music}/music/Electro 01.mp3`)
        })
        var testButton2 = document.getElementById('testButton2')
        testButton2.addEventListener('click',() => {
            sequence.getHubTracks()
        })*/
  // AUDIO TOOLS WORKSPACE
  // Update Access Token
  let audioPlayerBody = document.getElementById("audioPlayerBody");
  await audioTools.renderAudioPlayer(audioPlayerBody);
  await dropbox.AccessToken();
  // Add spacebar listeners for players
  let audioToolsContainer = document.querySelector("#audioToolContainers");
  document.addEventListener("keydown", (event) => {
    if (
      event.code == "Space" &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !event.metaKey
    ) {
      event.preventDefault();
      if (
        window
          .getComputedStyle(audioToolsContainer)
          .getPropertyValue("display") != "none"
      ) {
        let playButton = document.querySelector(".playButton");
        let clickEvent = new Event("mousedown");
        playButton.dispatchEvent(clickEvent);
      }
    }
  });
  //POPULATE TRACKLIST
  await createList(
    "songManagerContainer",
    `${dropbox.dropboxPath.editorHub.folder.resources.music}`,
    listType.music
  ).catch((e) => global.hubException(e));
  //Populate SFX Lists
  await createList(
    "soundFxManagerContainer",
    `${dropbox.dropboxPath.editorHub.folder.resources.sfx}`,
    listType.sfx
  ).catch((e) => global.hubException(e));
  //Populate Settings
  let audioToolsSettings = await settings.getSettingsGroup("audioTools");
  createSettingsList("audioSettingsContainer", audioToolsSettings);
  //Set Player Volume
  audioTools.adjustVolume(audioToolsSettings.playerVolume.currentValue);

  //PATCH NOTES
  let audioToolSettingsTab = [...document.querySelectorAll("[data-link]")];
  for (let link of audioToolSettingsTab) {
    let linkTag = link.dataset.link;
    if (linkTag == "audioToolSettingsTab") {
      link.addEventListener("click", () => {
        let audioToolsTab = document.getElementById("wp_audioToolsTab");
        audioToolsTab.click();
        // audioToolsTab.dispatchEvent(new Event('click'))
        let audioSettingsTab = document.getElementById(
          "audioSettingsTab_inactive"
        );
        // audioSettingsTab.dispatchEvent(new Event('click'))
        audioSettingsTab.click();
      });
    } else if (linkTag == "songManagerTab") {
      link.addEventListener("click", () => {
        let audioToolsTab = document.getElementById("wp_audioToolsTab");
        audioToolsTab.click();
        // audioToolsTab.dispatchEvent(new Event('click'))
        let songManagerTab = document.querySelectorAll(".audioToolTab")[0];
        // audioSettingsTab.dispatchEvent(new Event('click'))
        songManagerTab.click();
      });
    } else if (linkTag == "sfxManagerTab") {
      link.addEventListener("click", () => {
        let audioToolsTab = document.getElementById("wp_audioToolsTab");
        audioToolsTab.click();
        // audioToolsTab.dispatchEvent(new Event('click'))
        let sfxManagerTab = document.querySelectorAll(".audioToolTab")[1];
        // audioSettingsTab.dispatchEvent(new Event('click'))
        sfxManagerTab.click();
      });
    }
  }
}
function change_wpTab(event) {
  //Reset all classes to inactive
  var wp_tabs = document.getElementsByClassName("wp_tab");
  for (var i = 0; i < wp_tabs.length; i++) {
    let tab = wp_tabs[i].getElementsByTagName("div")[1];
    tab.classList.remove(`${tab.classList[1]}_active`);

    wp_tabs[i]
      .getElementsByTagName("div")[0]
      .classList.remove("select_glow_active");
  }
  let targetElem = event.currentTarget.getElementsByTagName("div");
  targetElem[1].classList.add(`${targetElem[1].classList[1]}_active`);
  targetElem[0].classList.add("select_glow_active");

  //Make all containers invisible
  var wp_panels = document.getElementsByClassName("wp_container");
  for (var i = 0; i < wp_panels.length; i++) {
    wp_panels[i].style.display = "none";
    let settingsDiv = wp_panels[i].querySelector("[data-settings-group]");
    if (settingsDiv && global.settingsCache) {
      settings.clearCache(settingsDiv);
    }
  }
  //Set the active panel visible
  var buttonName = event.currentTarget.getElementsByTagName("div")[1].classList;
  for (var i = 0; i < wp_panels.length; i++) {
    var panelName = wp_panels[i].id;
    if (panelName.split("_")[1] == buttonName[1]) {
      wp_panels[i].style.display = "flex";
      break;
    }
  }
}
function changeAudioTab(event) {
  const tabs = document.getElementById("audioToolTabs").children;
  // const containers = document.getElementById("audioToolContainers").children
  for (var tab of tabs) {
    if (tab.id == event.currentTarget.id) {
      tab.classList.add("audioToolTab_active");
      tab.id = tab.id.replace(tab.id.split("_")[1], "active");
      let container = document.getElementById(
        tab.id.split("_")[0].replace("Tab", "Container")
      );
      container.style.display = "flex";
    } else {
      tab.classList.remove("audioToolTab_active");
      tab.id = tab.id.replace(tab.id.split("_")[1], "inactive");
      let container = document.getElementById(
        tab.id.split("_")[0].replace("Tab", "Container")
      );
      container.removeAttribute("style");
      if (
        container.hasAttribute("data-settings-group") &&
        global.settingsCache
      ) {
        settings.clearCache(container);
      }
    }
  }
}
/**
 * Creates an empty item list in the UI within the specified element and populates it.
 * @param {String} parentID The id of the list's parent element within which the list will be created.
 * @param {String} title The title displayed in the list's header.
 * @param {String} folderPath The dropbox folder path used as a reference to create the list
 * @param {Object} type An object containing data for the type of items in the list, it contains the svg icons as well as settings on how to preview the item.
 */
async function createList(parentID, folderPath, type) {
  let container = document.getElementById(parentID);

  let listHeader = document.createElement("div");
  listHeader.setAttribute("class", "listHeader");

  let headerTitle = document.createElement("h2");
  headerTitle.setAttribute("style", "font-weight: 400;color:hsl(0, 0%, 85%)");
  let baseName = path.basename(folderPath).split(".")[0];
  let headerName = baseName.replace(/\b\w/g, function (l) {
    return l.toUpperCase();
  });
  let text = document.createTextNode(headerName);
  headerTitle.appendChild(text);
  listHeader.appendChild(headerTitle);

  let separator = document.createElement("div");
  separator.setAttribute("class", "listSeparator");

  let searchBar = document.createElement("input");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("id", "searchBar");
  searchBar.setAttribute("name", "Search Bar");
  searchBar.setAttribute("class", "searchBar");
  searchBar.setAttribute("placeHolder", "Search...");
  searchBar.addEventListener("input", (event) => {
    let value = event.target.value;
    itemSearch(value, container.querySelector(".listDiv"));
  });

  let listDiv = document.createElement("div");
  // listDiv.setAttribute('id','listDiv')
  listDiv.setAttribute("class", "listDiv");
  container.appendChild(listHeader);
  container.appendChild(separator);
  container.appendChild(searchBar);
  container.appendChild(listDiv);

  populateList(listDiv, folderPath, type, listDiv);
}
/**
 *
 * @param {HTMLElement} listBody The list's body, and HTML element into which the items will be created.
 * @param {String} folderPath The dropbox path to the folder from which the items will be fetched.
 * @param {Object} type An object containing data for the type of items in the list, it contains the svg icons as well as settings on how to preview the item.
 */
async function populateList(listBody, folderPath, type, listCanvas) {
  await dropbox
    .getFiles(folderPath)
    .then(async (folderContent) => {
      for (let item of folderContent) {
        if (item[".tag"] == "file") {
          let icon = document.createElement("div");
          icon.setAttribute("class", type.iconClass);

          let content = document.createTextNode(item.name.split(".")[0]);
          let itemTitle = document.createElement("div");
          itemTitle.className = "itemTitle";
          itemTitle.appendChild(content);

          let previewIcon = document.createElement("div");
          previewIcon.setAttribute("class", type.previewClass);

          let preview = document.createElement("div");
          preview.setAttribute("class", "itemPreview");
          preview.setAttribute("title", "preview");
          preview.addEventListener("click", (event) => type.preview(event));
          preview.appendChild(previewIcon);

          let importIcon = document.createElement("div");
          importIcon.setAttribute("class", "importIcon");

          let importButton = document.createElement("div");
          importButton.setAttribute("class", "itemImport");
          importButton.setAttribute("title", "Import/Place");
          importButton.appendChild(importIcon);
          importButton.addEventListener("click", (event) =>
            handleClick(
              event,
              dir.tutorial.editorHub.songManager,
              importFile,
              async (event) => {
                const target = event.currentTarget;
                let wp_container = target.closest(".wp_container");
                let settingsContainer = wp_container.querySelector(
                  "[data-settings-group]"
                );
                let settingsGroupName = settingsContainer.dataset.settingsGroup;
                let settingsGroup = await settings.getSettingsGroup(
                  settingsGroupName
                );
                let insertMode = settingsGroup.insertMode.currentValue;
                let trackLayout = settingsGroup.trackLayout.currentArray;
                trackLayout.sort((a, b) => {
                  return a.trackNumber - b.trackNumber;
                });
                let layoutArray = [];
                for (let trackObject of trackLayout) {
                  layoutArray.push(trackObject.trackName);
                  if (trackObject.trackTitle != type.trackTitle) {
                    continue;
                  }
                  await placeFile(event, target, layoutArray, insertMode);
                  break;
                }
              }
            )
          );

          let actionsBar = document.createElement("div");
          actionsBar.setAttribute("class", "actionsBar");
          actionsBar.appendChild(preview);
          actionsBar.appendChild(importButton);

          let today = new Date();
          let creationDate = new Date(item.server_modified);
          let timeDif = today - creationDate;
          let daysDif = timeDif / (1000 * 60 * 60 * 24);
          let isNew = daysDif <= 14;
          let newTag;
          if (isNew) {
            newTag = document.createElement("span");
            newTag.setAttribute("class", "newTag");
            newTag.appendChild(document.createTextNode("new"));
          }

          let isPlaying = document.createElement("div");
          isPlaying.className = "isPlaying";
          isPlaying.title = "Currently Playing";

          let elem = document.createElement("li");
          elem.appendChild(icon);
          elem.appendChild(itemTitle);
          // elem.appendChild(isPlaying)
          if (isNew) {
            elem.appendChild(newTag);
          }
          elem.appendChild(actionsBar);
          elem.setAttribute("id", item.path_display);
          elem.setAttribute("data-resource", JSON.stringify(item));
          elem.setAttribute("data-searchable", "item");
          elem.setAttribute("data-track-title", type.trackTitle);
          elem.setAttribute("data-track-type", type.trackType);
          elem.setAttribute("tabindex", "0");
          elem.setAttribute("class", "listItem");
          elem.addEventListener("keydown", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const target = event.currentTarget;
            if (event.code === "Space") {
              type.preview(event);
            } else if (event.code === "ArrowUp") {
              event.preventDefault();
              let activeElem = document.activeElement;
              let currentIndex = liItems.indexOf(activeElem);
              for (let i = currentIndex - 1; i >= 0; i--) {
                let previousLiElem = liItems[i];
                if (!listCanvas.contains(previousLiElem)) {
                  break;
                }
                let targetElem = previousLiElem;
                let skipElem = false;
                while (targetElem != listCanvas) {
                  let style = getComputedStyle(targetElem);
                  let display = style.getPropertyValue("display");
                  targetElem = targetElem.parentElement;
                  if (display == "none") {
                    skipElem = true;
                    break;
                  }
                }
                if (skipElem == true) {
                  continue;
                }
                previousLiElem.focus();
                break;
              }
            } else if (event.code === "ArrowDown") {
              event.preventDefault();
              let activeElem = document.activeElement;
              let currentIndex = liItems.indexOf(activeElem);
              for (let i = currentIndex + 1; i < liItems.length; i++) {
                let nextLiElem = liItems[i];
                if (!listCanvas.contains(nextLiElem)) {
                  break;
                }
                let targetElem = nextLiElem;
                let skipElem = false;
                while (targetElem != listCanvas) {
                  let style = getComputedStyle(targetElem);
                  let display = style.getPropertyValue("display");
                  targetElem = targetElem.parentElement;
                  if (display == "none") {
                    skipElem = true;
                    break;
                  }
                }
                if (skipElem == true) {
                  continue;
                }
                nextLiElem.focus();
                break;
              }
            } else if (
              event.code === "Enter" &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              importFile(event, target);
            } else if (
              event.key == "Control" ||
              event.key == "Shift" ||
              event.key == "Alt" ||
              event.key == "Meta"
            ) {
              return null;
            } else {
              let wp_container = target.closest(".wp_container");
              let settingsContainer = wp_container.querySelector(
                "[data-settings-group]"
              );
              let settingsGroupName = settingsContainer.dataset.settingsGroup;
              let settingsGroup = await settings.getSettingsGroup(
                settingsGroupName
              );
              let insertMode = settingsGroup.insertMode.currentValue;
              let trackLayout = settingsGroup.trackLayout.currentArray;
              trackLayout.sort((a, b) => {
                return a.trackNumber - b.trackNumber;
              });
              let layoutArray = [];
              for (let trackObject of trackLayout) {
                layoutArray.push(trackObject.trackName);
                if (trackObject.trackTitle != type.trackTitle) {
                  continue;
                }
                let keyBind = trackObject.keyBind;
                if (
                  event.key.toLowerCase() == keyBind.key.toLowerCase() &&
                  event.ctrlKey == keyBind.ctrl &&
                  event.shiftKey == keyBind.shift &&
                  event.altKey == keyBind.alt
                ) {
                  await placeFile(event, target, layoutArray, insertMode);
                  break;
                }
              }
            }
          });
          // elem.addEventListener('keydown',event => {
          //     if(event.code === 'Tab'){alert('sisassss!')}
          // })
          listBody.appendChild(elem);
        } else if (item[".tag"] == "folder") {
          let folder = document.createElement("div");
          folder.setAttribute("class", "listFolder");
          folder.setAttribute("id", item.path_display);
          folder.setAttribute("data-resource", JSON.stringify(item));
          folder.setAttribute("data-searchable", "folder");

          let icon = document.createElement("div");
          icon.setAttribute("class", "folderIcon");

          let h2 = document.createElement("h2");
          let content = document.createTextNode(item.name);
          h2.setAttribute("style", "display:flex");
          h2.appendChild(content);

          let isPlaying = document.createElement("div");
          isPlaying.className = "isPlayingFolder";
          isPlaying.title = "Currently Playing";

          let header = document.createElement("div");
          header.setAttribute("class", "listFolderHead");
          header.addEventListener("click", (event) =>
            collapseFolderItem(event)
          );
          header.appendChild(icon);
          header.appendChild(h2);
          header.appendChild(isPlaying);
          // header.appendChild(actionsBar)

          let body = document.createElement("div");
          body.setAttribute("class", "listFolderBody");

          folder.appendChild(header);
          folder.appendChild(body);

          listBody.appendChild(folder);

          populateList(body, item.path_display, type, listCanvas);
        }
      }
      global.liItems = [...document.querySelectorAll("li")];
    })
    .catch((e) => global.hubException(e));
}
async function importFile(event, target, isPlace) {
  event.preventDefault();
  event.stopPropagation();
  //Stop all players
  let filePath;
  if (event.type == "click") {
    filePath = target.parentElement.parentElement.id;
  } else if ((event.type = "keydown")) {
    filePath = target.id;
  }
  let resource = new resourceAPI.Resource(filePath);
  await dropbox.AccessToken();
  let wp_container = target.closest(".wp_container");
  let settingsContainer = wp_container.querySelector("[data-settings-group]");
  let settingsGroupName = settingsContainer.dataset.settingsGroup;
  let settingsGroup = await settings.getSettingsGroup(settingsGroupName);
  if (!isPlace) {
    stat.logEvent(target, event, "fileImport", filePath);
  }
  if (audioTools.getAudioContext().playing) {
    audioTools.playPause();
  }
  return await resourceAPI
    .importResource(
      resource,
      "dropbox",
      settingsGroup,
      audioTools.getAudioContext().bufferArray
    )
    .catch((e) => global.hubException(e));
}
async function placeFile(event, target, layoutArray, insertMode) {
  let trackTitle = target.closest("[data-track-title]").dataset.trackTitle;
  let trackType = target.closest("[data-track-type").dataset.trackType;
  let trackData = {
    trackType: trackType,
    trackTitle: trackTitle,
    layoutArray: layoutArray,
    insertMode: insertMode,
  };
  await sequence.resolveVOTrack(layoutArray[0]);
  await importFile(
    event,
    target,
    audioTools.getAudioContext().bufferArray,
    true
  )
    .then(async (resource) => {
      await resourceAPI.placeResource(resource, trackData);
      stat.logEvent(target, event, "filePlace", resource.dropboxPath);
    })
    .catch((e) => global.hubException(e));
}
/**
 *
 * @param {HTMLElement} parent
 * @param {String} id
 * @param {Array} options Array of option objects.
 * @param {Number} selected
 * @param {Function} callback
 */
async function createDropdown(id, options, selected) {
  let dropdownHead = document.createElement("div");
  dropdownHead.setAttribute("class", "dropdownHead");
  dropdownHead.setAttribute("id", id);
  let t = document.createElement("h2");
  t.appendChild(document.createTextNode(options[selected].value));
  dropdownHead.appendChild(t);
  // dropdownHead.setAttribute('data-current-value',JSON.stringify(options[selected]))

  let dropdownBody = document.createElement("div");
  dropdownBody.setAttribute("class", "dropdownBody");
  // dropdownBody.setAttribute('id','dropdownBody')
  for (let option of options) {
    let t = document.createElement("h2");
    t.appendChild(document.createTextNode(option.value));
    let o = document.createElement("div");
    o.setAttribute("class", "dropdownOption");
    o.setAttribute("data-value", JSON.stringify(option));
    o.appendChild(t);
    o.addEventListener("click", (event) => {
      event.stopPropagation();
      let optionValue = JSON.parse(event.currentTarget.dataset.value);
      let body = event.currentTarget.parentElement;
      body.removeAttribute("style");
      let head = body.parentElement.children[0];

      if (head.children[0].textContent == optionValue.value) {
        return;
      }
      head.children[0].textContent = optionValue.value;
      // head.dataset.currentValue = optionValue
      let newValue = options.indexOf(option);
      settings
        .cacheSettings(event.currentTarget, newValue)
        .then(() => {})
        .catch((e) => global.hubException(e));
    });
    dropdownBody.appendChild(o);
  }
  let dropdown = document.createElement("div");
  dropdown.setAttribute("class", "dropdown");
  dropdown.setAttribute("id", "dropdownContainer");
  dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    let panels = [...event.currentTarget.closest(".settingsDiv").children];
    for (let panel of panels) {
      if (panel == event.currentTarget.parentElement.parentElement) {
        continue;
      }
      let panelType = panel.dataset.type;
      if (panelType == "dropdown") {
        panel.children[1].children[0].children[1].removeAttribute("style");
      }
    }
    let body = event.currentTarget.children[1];
    let bodyDisplay = getComputedStyle(body).getPropertyValue("display");
    if (bodyDisplay == "none") {
      body.style.display = "flex";
    } else {
      body.removeAttribute("style");
    }
  });
  dropdown.appendChild(dropdownHead);
  dropdown.appendChild(dropdownBody);
  return dropdown;
}
function handleClick(event, tutorial, callback, ctrlCallback) {
  let target = event.currentTarget;
  if (event.altKey && tutorial) {
    openTutorial(target, event, tutorial);
    // cep.util.openURLInDefaultBrowser(tutorial)
  } else if (event.ctrlKey && ctrlCallback) {
    ctrlCallback(event, target);
  } else {
    callback(event, target);
  }
}
function collapseFolderItem(event) {
  document.getSelection().removeAllRanges();
  let folder = event.currentTarget.parentElement.children[1];
  let style = window.getComputedStyle(folder);
  let folderDisplay = style.getPropertyValue("display");
  folderDisplay == "flex"
    ? (folder.style.display = "none")
    : (folder.style.display = "flex");
}
function itemSearch(value, listDiv) {
  let listItems = [...listDiv.querySelectorAll("[data-searchable]")];
  //   let currentSourceNode = audioTools.getSourceNode()
  for (let item of listItems) {
    if (value == "") {
      if (item.dataset.searchable == "item") {
        item.removeAttribute("style");
      } else if (item.dataset.searchable == "folder") {
        item.children[1].removeAttribute("style");
        item.removeAttribute("style");
      }
      continue;
    }
    if (item.dataset.searchable == "item") {
      let res = JSON.parse(item.dataset.resource);
      if (res.name.toLowerCase().includes(value.toLowerCase())) {
        item.style.display = "flex";
        let parent = item.parentElement;
        while (parent != listDiv) {
          parent.style.display = "flex";
          parent.parentElement.style.display = "flex";
          parent = parent.parentElement.parentElement;
        }
      } else {
        item.style.display = "none";
      }
    } else if (item.dataset.searchable == "folder") {
      item.style.display = "none";
      item.children[1].style.display = "none";
    }
  }
}
async function createSettingsList(parent, settingsGroup) {
  let container = document.getElementById(parent);

  let listHeader = document.createElement("div");
  listHeader.setAttribute("class", "listHeader");

  let headerTitle = document.createElement("h2");
  headerTitle.setAttribute("style", "font-weight: 400;color:hsl(0, 0%, 85%)");
  let text = document.createTextNode("Settings");
  headerTitle.appendChild(text);
  listHeader.appendChild(headerTitle);

  let separator = document.createElement("div");
  separator.setAttribute("class", "listSeparator");

  let listDiv = document.createElement("div");
  listDiv.setAttribute("class", "settingsDiv");
  listDiv.addEventListener("click", (event) => {
    let panels = [...event.currentTarget.children];
    for (let panel of panels) {
      let panelType = panel.dataset.type;
      if (panelType == "dropdown") {
        panel.children[1].children[0].children[1].removeAttribute("style");
      }
    }
  });

  for (let property in settingsGroup) {
    let setting = settingsGroup[property];
    let panel = createSettingsPanel(setting);
    listDiv.appendChild(panel);
  }

  let actions = document.createElement("div");
  actions.setAttribute("class", "settingsActions");

  let saveButton = document.createElement("div");
  saveButton.classList.add("actionButton", "saveButton");
  saveButton.appendChild(document.createTextNode("Save Changes"));
  saveButton.addEventListener("click", () =>
    settings.consolidateSettings(container)
  );

  let cancelButton = document.createElement("div");
  cancelButton.classList.add("actionButton", "cancelButton");
  cancelButton.appendChild(document.createTextNode("Cancel"));
  cancelButton.addEventListener("click", () => settings.clearCache(container));

  let restoreButton = document.createElement("div");
  restoreButton.classList.add("actionButton", "restoreButton");
  restoreButton.appendChild(document.createTextNode("Retore Default Settings"));
  restoreButton.addEventListener("click", () =>
    settings.restoreDefaultSettings(container, settingsGroup)
  );

  let clearDownloads = document.createElement("div");
  clearDownloads.classList.add("actionButton", "clearDownloadsButton");
  clearDownloads.appendChild(document.createTextNode("Clear Downloads"));
  clearDownloads.addEventListener("click", () =>
    settings.clearDownloads(container)
  );

  actions.appendChild(saveButton);
  actions.appendChild(cancelButton);
  actions.appendChild(restoreButton);
  actions.appendChild(clearDownloads);

  container.appendChild(listHeader);
  container.appendChild(separator);
  container.appendChild(listDiv);
  container.appendChild(actions);
}
function createSettingsPanel(settingsObject) {
  let panel = document.createElement("div");

  let settingTitle = document.createElement("h2");
  settingTitle.appendChild(document.createTextNode(settingsObject.name));

  let type = settingsObject.type;
  let setting = document.createElement("div");
  setting.setAttribute("data-setting-id", settingsObject.id);
  if (type == "slider") {
    let slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", settingsObject.valueRange[0]);
    slider.setAttribute("max", settingsObject.valueRange[1]);
    slider.setAttribute("step", settingsObject.valueRange[2]);
    slider.setAttribute("value", settingsObject.currentValue);
    slider.setAttribute("class", "slider");
    slider.addEventListener("input", async (event) => {
      let newValue = event.currentTarget.value;
      await settings.cacheSettings(event.currentTarget, eval(newValue));
    });
    setting.appendChild(slider);
    panel.setAttribute("data-type", "slider");
  } else if (type == "dropdown") {
    createDropdown(
      settingsObject.id,
      settingsObject.valueArray,
      settingsObject.currentValue
    ).then((dropdown) => {
      setting.appendChild(dropdown);
      panel.setAttribute("data-type", "dropdown");
    });
  } else if (type == "trackLayout") {
    let trackObjects = settingsObject.currentArray;
    let layoutList = document.createElement("div");
    layoutList.className = "layoutList";
    renderSettingsTracks(layoutList, trackObjects, undefined);
    setting.appendChild(layoutList);
    panel.setAttribute("data-type", "trackLayout");
  }

  panel.setAttribute("class", "settingsPanel");
  panel.appendChild(settingTitle);
  panel.appendChild(setting);

  return panel;
}
function renderSettingsTracks(layoutList, trackObjects, range) {
  //iterating through the tracks
  trackObjects.sort((a, b) => {
    return a.trackNumber - b.trackNumber;
  });
  let trackDivs = layoutList.children;
  let empty = false;
  if (trackDivs.length == 0) {
    empty = true;
  }
  for (let trackObject of trackObjects) {
    //checking the track is within range
    let i = trackObjects.indexOf(trackObject);
    if (range && (i < range[0] || i > range[1])) {
      continue;
    }
    //Defining the track div
    let trackDiv;
    if (empty) {
      trackDiv = document.createElement("div");
      trackDiv.setAttribute("class", "trackDiv");
    } else {
      trackDiv = trackDivs[i];
    }
    //Define props
    const { trackId, trackName, trackTitle, keyBind, trackNumber } =
      trackObject;
    let trackTitleH2, trackNameInput, keyBindTitle, keyBindDiv, actionsBox;
    trackDiv.dataset.trackId = trackId;
    let trackProps = trackDiv.querySelectorAll("[data-track-property]");
    if (trackProps.length == 4) {
      trackTitleH2 = trackDiv.querySelector(
        `[data-track-property="trackTitle"]`
      );
      trackTitleH2.textContent = trackTitle;
      trackNameInput = trackDiv.querySelector(
        `[data-track-property="trackName"]`
      );
      trackNameInput.value = trackName;
      keyBindTitle = trackDiv.children[2];
      keyBindDiv = trackDiv.querySelector(`[data-track-property="keyBind"]`);
      keyBindDiv.children[0].textContent = settings.getKeyBindText(keyBind);
      actionsBox = trackDiv.querySelector(
        `[data-track-property="trackNumber"]`
      );
      actionsBox.dataset.trackNumber = trackNumber;
    } else {
      trackDiv.innerHTML = "";

      trackTitleH2 = document.createElement("h2");
      trackTitleH2.style.minWidth = "35px";
      trackTitleH2.title = "track type";
      trackTitleH2.dataset.trackProperty = "trackTitle";
      trackTitleH2.appendChild(document.createTextNode(trackTitle));

      trackNameInput = document.createElement("input");
      trackNameInput.type = "text";
      trackNameInput.value = trackName;
      trackNameInput.className = "inputBox";
      trackNameInput.title = "track's default name";
      trackNameInput.dataset.trackProperty = "trackName";
      trackNameInput.addEventListener("input", async (event) => {
        settings.cacheSettings(event.currentTarget, event.currentTarget.value);
      });

      keyBindTitle = document.createElement("h2");
      keyBindTitle.style.marginRight = "auto";
      keyBindTitle.title = "keybind to place on this track";
      keyBindTitle.appendChild(document.createTextNode("keybind"));

      let kbText = settings.getKeyBindText(keyBind);
      let keyBindH2 = document.createElement("h2");
      keyBindH2.appendChild(document.createTextNode(kbText));

      keyBindDiv = document.createElement("div");
      keyBindDiv.appendChild(keyBindH2);
      keyBindDiv.className = "trackKeyBind";
      keyBindDiv.title = "click to change";
      keyBindDiv.dataset.trackProperty = "keyBind";
      keyBindDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        let target = event.currentTarget;
        let targetText = target.children[0];
        let currentKeybind = targetText.textContent;
        function captureKeyBind(event) {
          let keyBindText = settings.captureKeyBind(event, target);
          if (keyBindText) {
            targetText.textContent = keyBindText;
          } else if (keyBindText == false) {
            targetText.textContent = currentKeybind;
          } else if (!keyBindText) {
            return null;
          }
          targetText.removeAttribute("style");
          document.removeEventListener("keydown", captureKeyBind);
        }
        document.addEventListener("keydown", captureKeyBind);
        targetText.textContent = "...";
        targetText.style.color = "hsl(45, 00%, 90%)";
      });
      let upArrow = document.createElement("div");
      upArrow.className = "upArrow";
      upArrow.title = "move track up";
      upArrow.addEventListener("click", async (event) => {
        let target = event.currentTarget;
        let trackDiv = target.closest(".trackDiv");
        let layoutList = trackDiv.parentElement;
        if ([...layoutList.children].indexOf(trackDiv) <= 1) {
          return;
        }
        let referenceElement;
        for (let i = 0; i < layoutList.children.length; i++) {
          let child = layoutList.children[i];
          if (child == target.closest(".trackDiv")) {
            referenceElement = layoutList.children[i - 1];
          }
        }
        await settings.cacheSettings(target.parentElement, -1);
        layoutList.insertBefore(trackDiv, referenceElement);
      });
      let downArrow = document.createElement("div");
      downArrow.className = "downArrow";
      downArrow.title = "move track down";
      downArrow.addEventListener("click", async (event) => {
        let target = event.currentTarget;
        let trackDiv = target.closest(".trackDiv");
        let layoutList = trackDiv.parentElement;
        if (layoutList.lastChild === trackDiv) {
          return;
        }
        let referenceElement;
        for (let i = 0; i < layoutList.children.length; i++) {
          let child = layoutList.children[i];
          if (child == target.closest(".trackDiv")) {
            referenceElement = layoutList.children[i + 1];
            break;
          }
        }
        await settings.cacheSettings(target.parentElement, 1);
        if (layoutList.lastChild === referenceElement) {
          layoutList.appendChild(trackDiv);
        } else {
          layoutList.insertBefore(referenceElement, trackDiv);
        }
      });

      actionsBox = document.createElement("div");
      actionsBox.className = "actionBox";
      actionsBox.dataset.trackProperty = "trackNumber";
      actionsBox.dataset.trackNumber = trackNumber;
      actionsBox.appendChild(upArrow);
      actionsBox.appendChild(downArrow);

      trackDiv.appendChild(trackTitleH2);
      trackDiv.appendChild(trackNameInput);
      trackDiv.appendChild(keyBindTitle);
      trackDiv.appendChild(keyBindDiv);
      trackDiv.appendChild(actionsBox);
    }
    if (!keyBind.key) {
      keyBindTitle.style.display = "none";
      keyBindDiv.style.display = "none";
      actionsBox.style.display = "none";
    } else {
      keyBindTitle.style.display = "flex";
      keyBindDiv.removeAttribute("style");
      actionsBox.removeAttribute("style");
    }
    if (empty) {
      layoutList.appendChild(trackDiv);
    }
  }
}
async function openTutorial(target, event, embed) {
  await stat.logEvent(target, event, "Opened Tutorial", null);
  let tutorialViewer = document.getElementById("tutorialViewer");
  tutorialViewer.innerHTML = embed;
  tutorialViewer.style.display = "flex";
  setTimeout(() => {
    tutorialViewer.style.opacity = "1";
  }, 100);
  tutorialViewer.addEventListener("mouseover", (event) => {
    event.stopPropagation();
    event.preventDefault();
  });
  tutorialViewer.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    tutorialViewer.style.opacity = "0";
    setTimeout(() => {
      tutorialViewer.style.display = "none";
      tutorialViewer.innerHTML = "";
    }, 700);
    youtubePlayer = null;
  });
}

module.exports = {
  buildUI,
  change_wpTab,
  handleClick,
  changeAudioTab,
  collapseFolderItem,
  placeFile,
  renderSettingsTracks,
  openTutorial,
};

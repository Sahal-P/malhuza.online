const content = [
  {
    "id": "c9cfeeb5-35f8-4fb7-81d8-2603a53b9051",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left",
      "level": 2
    },
    "content": [
      {
        "type": "text",
        "text": "Default content",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "ad6604f4-0e0e-4d1c-9964-3c3e3cbdc422",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "brown",
      "textAlignment": "center",
      "level": 3
    },
    "content": [
      {
        "type": "text",
        "text": "If you're ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "working ",
        "styles": {
          "bold": true,
          "italic": true,
          "underline": true,
          "strike": true
        }
      },
      {
        "type": "text",
        "text": "with a string in React and you want to extract the filename from a given S3 URL, you can use JavaScript's string manipulation functions. Here's an example of how you can extract the filename from the provided S3 URL:",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "bfb11bc1-f630-4466-a378-67efb9f6d610",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "javascriptCopy code",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "d9c2bd28-8408-4eeb-b294-e5919decb5f2",
    "type": "paragraph",
    "props": {
      "textColor": "yellow",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "const s3Url = 'https://s3.eu-north-1.amazonaws.com/async-await.online/media/images/malhuza/jwt_middleware_2%20%282%29%20%281%29.png'; // Use the URL API to extract the pathname const url = new URL(s3Url); const pathname = decodeURIComponent(url.pathname); // Extract the filename from the pathname const filename = pathname.split('/').pop(); console.log(filename); // Output: jwt_middleware_2%20%282%29%20%281%29.png",
        "styles": {
          "code": true
        }
      }
    ],
    "children": []
  },
  {
    "id": "09af3110-588d-4f7e-9040-ac8b5e342301",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "In this example:",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "b62f0c66-bf00-42c6-bd57-2c1084bf0830",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "URL",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": " object is used to parse the URL.",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "9fc855f0-b0ed-4638-9579-5160606000c8",
    "type": "numberedListItem",
    "props": {
      "textColor": "pink",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "decodeURIComponent",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": " function is used to decode the URL-encoded characters in the pathname.",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "01b718f5-0b88-4088-8a70-480ad5480b2b",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "split('/')",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": " method is used to split the pathname into an array of path segments.",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "00953446-d1ba-48fd-bd63-1e346a64e789",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "pop()",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": " method is used to retrieve the last element of the array, which corresponds to the filename.",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "578133fb-7671-4a0c-bcbd-65bd4f05d9f8",
    "type": "paragraph",
    "props": {
      "textColor": "brown",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "The ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "filename",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": " variable will contain the extracted filename. Note that it retains URL-encoded characters, so if you need to display it in a user-friendly way, you might want to further decode the filename using ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "decodeURIComponent",
        "styles": {
          "code": true
        }
      },
      {
        "type": "text",
        "text": ".",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "ce17a7f4-1e3a-4bc0-9dc0-338d99f8978b",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "\n",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "e8e46397-ac44-4432-835b-e1e7c1d376ab",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "ok ok",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "24ef462a-23f6-43a3-bc79-eb8cec9d1fd6",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "test1",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "0e8d5e4e-617d-4db2-a788-d8d4b0295d0a",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "test2",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "4f0c5435-e320-4f93-b7f1-f0fd491912f7",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "oho",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "dbdc498b-2726-45f2-9bf8-42910d5b73bf",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "oho 2adafvadfvadfv",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "cbe216c0-0335-4991-a12f-fadf70dfc9e7",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "adfvadfv",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "cd0810b5-245a-4f28-963e-ea103b55b401",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  },
  {
    "id": "eac9fe7b-633c-49b9-b036-84941661a4df",
    "type": "table",
    "props": {
      "textColor": "default",
      "backgroundColor": "default"
    },
    "content": {
      "type": "tableContent",
      "rows": [
        {
          "cells": [
            [
              {
                "type": "text",
                "text": "dfvdfvdfrow1",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "dfdfvd",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "rt",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "gb",
                "styles": {}
              }
            ]
          ]
        },
        {
          "cells": [
            [
              {
                "type": "text",
                "text": "ro2",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "dfvdfvadfv",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "asdfvasfvas",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "asdfvasfvasdfv",
                "styles": {}
              }
            ]
          ]
        }
      ]
    },
    "children": []
  },
  {
    "id": "6b709f3a-f3bd-4dc1-90f2-079d64e985c3",
    "type": "image",
    "props": {
      "backgroundColor": "default",
      "textAlignment": "left",
      "url": "https://s3.eu-north-1.amazonaws.com/async-await.online/media/images/malhuza/jwt_middleware_2%20%282%29%20%281%29.png",
      "caption": "",
      "width": 788
    },
    "children": []
  },
  {
    "id": "initialBlockId",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  }
]

export default content
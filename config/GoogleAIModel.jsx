const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Reference to :{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n} \n "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1684049112299,\n  \"blocks\": [\n    {\n      \"id\": \"a35b66f4-316d-445f-9d13-008243349c04\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery Todo List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"49132d3a-5353-4e1d-a3d5-915079e75383\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"This is a list of groceries to buy and tasks to complete.\"\n      }\n    },\n    {\n      \"id\": \"e0479a41-69e9-46d8-a13b-b0d15f477362\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\",\n          \"Cheese\",\n          \"Apples\",\n          \"Bananas\"\n        ]\n      }\n    },\n    {\n      \"id\": \"b31131e6-4872-47a1-895b-38718e13271e\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Tasks\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"1b3e49bd-553d-4748-b460-1e105a9557a7\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Pay bills\",\n          \"Walk the dog\",\n          \"Schedule doctor appointment\"\n        ]\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\nThis JSON template represents a basic Grocery TodoList document structured with Editor.js blocks:\n\n- **Header:**  \"Grocery Todo List\" (level 1) \n- **Paragraph:**  Introduces the purpose of the list.\n- **List:**  The first list contains grocery items.\n- **Header:**  \"Tasks\" (level 2)\n- **List:**  The second list contains tasks to be completed.\n\nYou can expand this template by adding more blocks like:\n\n- **Checklists:** To mark tasks as completed\n- **Images:** To add visual elements, like a picture of the grocery store.\n- **Code:** For more complex list organization (optional). \n\nRemember that the specific data within each block can be modified as per your needs.\n"},
          ],
        },
      ],
    });

    export { chatSession };
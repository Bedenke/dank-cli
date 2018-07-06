import path from "path";
import fs from "fs-extra";

export default function dankAddElement(
  directory: string,
  elementPath: string
) {
  if (!elementPath) {
    console.info("🔥 Missing the element path/ElementName");
    console.info("💻 dank +element path/to/ElementName");
    return;
  }

  let parsed = path.parse(elementPath);
  const elementName = parsed.name;

  const dashed = elementName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  let elementFileContent = `
import { div } from "dank-web";

export interface ${elementName}Attributes {
}
export default function ${elementName}(attributes: ${elementName}Attributes) {
  return div({ 
      class: "${dashed}" 
    },
    div("Wow, look at my brand new element:"),
    div("${elementName}")
  );
}`;

  let elementDir = path.join(directory, "src", "elements", parsed.dir);

  if (!fs.existsSync(elementDir)) {
    fs.ensureDirSync(elementDir);
    console.info("🌮 Created folder", elementDir);
  }

  let elementFile = path.join(elementDir, `${elementName}.ts`);
  fs.writeFileSync(elementFile, elementFileContent);
  console.info("🌮 Created file", elementFile);
}

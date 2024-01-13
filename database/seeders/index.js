import { model } from "../../app/models/index.js";
import testing from "./testing.js";

try {
  await testing();
} catch (error) {
  console.error(error);

  process.exit(1);
} finally {
  await model.$disconnect();
}

import apiKey from "../../../../config/api-key.js";
import { request } from "../../../TestCase.js";
import { StatusCodes } from "http-status-codes";

it("should return 200", async () => {
  const response = await request
    .get("/app-version")
    .set("X-API-Key", apiKey.production);

  expect(response.statusCode).toEqual(StatusCodes.OK);
  expect(response.body).toMatchObject({
    data: {
      ["app-version"]: process.env.npm_package_version,
    },
  });
});

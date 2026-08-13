"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDiseaseDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_disease_dto_1 = require("./create-disease.dto");
class UpdateDiseaseDto extends (0, mapped_types_1.PartialType)(create_disease_dto_1.CreateDiseaseDto) {
}
exports.UpdateDiseaseDto = UpdateDiseaseDto;
//# sourceMappingURL=update-disease.dto.js.map
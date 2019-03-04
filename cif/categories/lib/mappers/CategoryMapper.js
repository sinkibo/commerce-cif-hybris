"use strict";
/*
 * Copyright 2019 diconium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const commerce_cif_hybris_core_1 = require("@diconium/commerce-cif-hybris-core");
const commerce_cif_model_1 = require("@adobe/commerce-cif-model");
const commerce_cif_hybris_i18n_1 = require("@diconium/commerce-cif-hybris-i18n");
class CategoryMapper extends commerce_cif_hybris_core_1.Mapper {
    constructor(settings) {
        super(settings, commerce_cif_hybris_i18n_1.dahcTranslator.setLocale(settings.language));
    }
    mapFromInputArgsToActionParameters(mappable) {
        const { id: categoryId, } = mappable;
        return { categoryId };
    }
    /* istanbul ignore next */
    mapFromEntity(entity, mappable) {
        throw new Error('Unsupported Operation');
    }
    mapToEntity(dto, entity) {
        const { id, lastModified, name = id, subcategories, } = dto;
        const category = new commerce_cif_model_1.Category.Builder()
            .withId(id)
            .build();
        category.lastModifiedAt = lastModified;
        category.name = name;
        if (subcategories) {
            category.children = subcategories.map((subCategory) => {
                const subCategoryEntity = this.mapToEntity(subCategory);
                subCategoryEntity.mainParentId = id;
                return subCategoryEntity;
            });
        }
        return category;
    }
}
exports.default = CategoryMapper;
//# sourceMappingURL=CategoryMapper.js.map
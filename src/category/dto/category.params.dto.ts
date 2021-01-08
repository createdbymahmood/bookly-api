import { IsCategoryIdValid } from 'validations/isCategoryIdValid';

export class FindCategoryParams {
    @IsCategoryIdValid({
        message: 'Category not valid',
    })
    id: string;
}

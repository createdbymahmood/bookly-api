import { IsCategoryIdValid } from 'validations/isCategoryIdValid';

export class FindCategoryParams {
    @IsCategoryIdValid()
    id: string;
}

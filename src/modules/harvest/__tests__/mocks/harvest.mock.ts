import {
  cropBeansMock,
  cropCornMock,
} from '../../../crop/__tests__/mocks/crop.mock';
import { agriculturalPropertyMock } from '../../../agricutural-property/__tests__/mocks/agricultural-property.mock';

export const harvestMock = {
  id: 'id',
  name: 'Safrinha 2021',
  year: '2021',
  agriculturalPropertyId: agriculturalPropertyMock.id,
};

export const harvestToCropsCornMock = {
  id: 'id',
  harvest: harvestMock,
  crop: cropCornMock,
};

export const harvestToCropsBeansMock = {
  id: 'id',
  harvest: harvestMock,
  crop: cropBeansMock,
};

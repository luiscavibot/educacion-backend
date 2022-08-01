import { v4 as uuid } from 'uuid';
export const fileFilterName = (file: any) => {
  const fileName = file.originalname.split('.')[0];
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

  if (validExtensions.includes(fileExptension)) {
    return `${fileName}-${uuid()}.${fileExptension}`;
  }
  return '';
};

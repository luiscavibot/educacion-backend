export const fileFilterName = (file: any, hash: string) => {
  const fileName = file.originalname.split('.')[0];
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

  if (validExtensions.includes(fileExptension)) {
    return `${fileName}-${hash}.${fileExptension}`;
  }
  return '';
};

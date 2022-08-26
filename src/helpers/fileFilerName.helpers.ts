export const fileFilterName = (file: any, hash: string) => {
  const fileName = file.originalname.split('.').replace(' ', '-').toLowerCase();
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

  console.log(fileName);
  if (validExtensions.includes(fileExptension)) {
    return `${fileName}-${hash}.${fileExptension}`;
  }
  return '';
};

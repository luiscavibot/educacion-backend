export const fileFilterName = (file: any, hash: string) => {
  const fileName = file.originalname
    .split('.')[0]
    .replace(' ', '-')
    .toLowerCase();
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'pdf'];

  if (validExtensions.includes(fileExptension)) {
    return `${fileName}-${hash}.${fileExptension}`;
  }
  return '';
};

export const fileFilterVideo = (file: any, hash: string) => {
  const fileName = file.originalname
    .split('.')[0]
    .replace(' ', '-')
    .toLowerCase();
  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['mp4'];

  if (validExtensions.includes(fileExptension)) {
    return `${fileName}-${hash}.${fileExptension}`;
  }
  return '';
};

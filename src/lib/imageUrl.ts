

const imageUrlFormatter = (imagePath: string) => {
  return `https://firebasestorage.googleapis.com/v0/b/fir-homes.firebasestorage.app/o/${encodeURIComponent(imagePath)}?alt=media`
}

export default imageUrlFormatter
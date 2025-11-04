import { supabaseClient } from "./supabseClient";

export async function submitReport(
  title,
  description,
  category,
  images,
  lat,
  lng,
  userId,
  address
) {
  const imagesToTheBucket = images.map((image) => {
    const imageName = `${Math.random()}-${image.name}`;
    return new File([image], imageName, { type: image.type });
  });
  if (!lat) lat = null;
  if (!lng) lng = null;
  imagesToTheBucket.map(async (image) => {
    const { error } = await supabaseClient.storage
      .from("images")
      .upload(image.name, image);
    if (error) {
      console.log(error);
    }
  });
  const imageUrls = imagesToTheBucket.map((image) => {
    return `https://ooxddorlyaovshmrbbjo.supabase.co/storage/v1/object/public/images/${image.name}`;
  });

  const report = {
    title,
    description,
    category,
    imageUrls,
    lat,
    lng,
    userId,
    address,
    status: "NEW",
  };
  const { data, error } = await supabaseClient.from("reports").insert([report]);
  if (error) {
    console.log(error);
    return;
  }
  return data;
}

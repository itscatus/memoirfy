import PocketBase from 'pocketbase';
const pb = new PocketBase('https://memoirfy.pockethost.io/');

export const createDiary = async (diaryData) => {
    const formData = new FormData();
    formData.append("date", diaryData.date);
    formData.append("content", diaryData.content);
    formData.append("mood", diaryData.mood);
    formData.append("users", diaryData.users);

    if (diaryData.image) {
        formData.append("image", diaryData.image);
    }

    console.log("FormData being sent:", [...formData.entries()]); // Log isi FormData
    
    try {
        const record = await pb.collection("diaries").create(formData);
        return record;
    } catch (error) {
        console.error("Error creating diary:", error.data || error.message); // Tampilkan pesan error
        throw new Error(error.message);
    }
};

export async function getAllDiaries(userId) {
    try {
      const diaries = await pb.collection('diaries').getFullList({
        filter: `users='${userId}'`, // Filter berdasarkan userId
      });
      console.log("Fetched diaries:", diaries); // Debug
      return diaries;
    } catch (error) {
      console.error("Error fetching diaries:", error.message);
      throw new Error(error.message);
    }
  }
  
  

export async function getDiaryById(id) {
    return await pb.collection('diaries').getOne(id);
  }

export async function updateDiary(id, formData) {
try {
    const record = await pb.collection("diaries").update(id, formData);
    return record;
} catch (error) {
    throw new Error(error.message);
}
}

export async function deleteDiary(id) {
  return await pb.collection('diaries').delete(id);
}

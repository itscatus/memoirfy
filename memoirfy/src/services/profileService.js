import pb from "../services/authService.js"; // Sesuaikan path PocketBase instance-mu

// export const getProfile = async () => {
//   const user = await pb.authStore.model;
//   return {
//     name: user.name,
//     email: user.email,
//     pin: user.pin,
//   };
// };

// export const updateProfile = async (profile) => {
//   const userId = pb.authStore.model.id;
//   return pb.collection("users").update(userId, {
//     name: profile.name,
//     email: profile.email,
//     pin: profile.pin,
//   });
// };

export async function getProfile() {
    try {
      const userId = pb.authStore.model.id;
      return await pb.collection("users").getOne(userId);
    } catch (error) {
      throw new Error("Gagal mengambil profil: " + error.message);
    }
  }
  
  export async function updateProfile(profile) {
    try {
      const userId = pb.authStore.model.id;
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("email", profile.email);
      if (profile.avatar) {
        formData.append("avatar", profile.avatar);
      }
      return await pb.collection("users").update(userId, formData);
    } catch (error) {
      throw new Error("Gagal memperbarui profil: " + error.message);
    }
  }
  
  export async function requestEmailChange(newEmail) {
    try {
      await pb.collection("users").requestEmailChange(newEmail);
    } catch (error) {
      throw new Error("Gagal request ganti email: " + error.message);
    }
  }
  
  export async function requestPasswordReset(email) {
    try {
      await pb.collection("users").requestPasswordReset(email);
    } catch (error) {
      throw new Error("Gagal request reset password: " + error.message);
    }
  }

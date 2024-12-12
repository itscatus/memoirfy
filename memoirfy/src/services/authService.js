import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export default pb;

// Fungsi login
export async function login(email, password) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('currentUser', JSON.stringify(authData.record)); // Simpan data pengguna
    return authData;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
}

// Fungsi mendapatkan pengguna saat ini
export function getCurrentUser() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return user || null;
}

// Fungsi logout
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');
  pb.authStore.clear();
}

// Fungsi untuk registrasi pengguna baru
export async function registerUser(email, password, passwordConfirm, additionalData = {}) {
  try {
    // Buat pengguna baru
    const newUser = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
       // Tambahkan data tambahan jika ada
    });

    // Kirim permintaan verifikasi email
    await pb.collection('users').requestVerification(email);

    return {
      message: 'Registration successful! Please check your email for verification.',
      user: newUser,
    };
  } catch (error) {
    throw new Error(error.message || 'Registration failed.');
  }
}

// Fungsi untuk mengonfirmasi verifikasi email
export async function confirmEmailVerification(token) {
  try {
    await pb.collection('users').confirmVerification(token);
    return 'Email verification successful!';
  } catch (error) {
    throw new Error(error.message || 'Email verification failed.');
  }
}

// Fungsi untuk meminta ganti email
export async function requestEmailChange(newEmail) {
  try {
    await pb.collection('users').requestEmailChange(newEmail);
    return 'A confirmation email has been sent to your new email address.';
  } catch (error) {
    throw new Error(error.message || 'Failed to request email change.');
  }
}

// Fungsi untuk mengonfirmasi ganti email
export async function confirmEmailChange(token, password) {
  try {
    await pb.collection('users').confirmEmailChange(token, password);
    return 'Your email address has been updated successfully!';
  } catch (error) {
    throw new Error(error.message || 'Failed to confirm email change.');
  }
}

// Fungsi untuk meminta reset password
export async function requestPasswordReset(email) {
  try {
    await pb.collection('users').requestPasswordReset(email);
    return 'Password reset request has been sent to your email.';
  } catch (error) {
    throw new Error(error.message || 'Failed to request password reset.');
  }
}

// Fungsi untuk mengonfirmasi reset password
export async function confirmPasswordReset(token, newPassword, newPasswordConfirm) {
  try {
    await pb.collection('users').confirmPasswordReset(token, newPassword, newPasswordConfirm);
    return 'Password reset successful!';
  } catch (error) {
    throw new Error(error.message || 'Failed to reset password.');
  }
}

// Fungsi untuk memeriksa apakah pengguna sedang login
export function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// Servicio para manejar datos del usuario con localStorage
export interface UserData {
  name: string;
  email: string;
}

const USER_DATA_KEY = 'elproyectoia_user_data';

export const userDataService = {
  // Guardar datos del usuario
  saveUserData(userData: UserData): void {
    try {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.warn('No se pudieron guardar los datos del usuario:', error);
    }
  },

  // Obtener datos guardados del usuario
  getUserData(): UserData | null {
    try {
      const data = localStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('No se pudieron cargar los datos del usuario:', error);
      return null;
    }
  },

  // Verificar si el usuario ya ha proporcionado sus datos
  hasUserData(): boolean {
    const userData = this.getUserData();
    return userData !== null && userData.name.trim() !== '' && userData.email.trim() !== '';
  },

  // Limpiar datos del usuario
  clearUserData(): void {
    try {
      localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.warn('No se pudieron limpiar los datos del usuario:', error);
    }
  },

  // Actualizar solo el nombre
  updateUserName(name: string): void {
    const userData = this.getUserData();
    if (userData) {
      userData.name = name;
      this.saveUserData(userData);
    }
  },

  // Actualizar solo el email
  updateUserEmail(email: string): void {
    const userData = this.getUserData();
    if (userData) {
      userData.email = email;
      this.saveUserData(userData);
    }
  }
}; 
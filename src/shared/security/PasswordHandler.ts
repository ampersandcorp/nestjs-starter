import argon2 from 'argon2';

export class PasswordHandler {
  private static readonly ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  static async hashPassword(password: string): Promise<string> {
    try {
      if (!password || password.trim().length === 0) {
        throw new Error('Password cannot be empty');
      }

      if (password.length > 1000) {
        throw new Error('Password is too long');
      }

      return await argon2.hash(password, this.ARGON2_OPTIONS);
    } catch (error) {
      if (error.message.includes('Password')) {
        throw error;
      }
      throw new Error(`Password hashing failed: ${error.message}`);
    }
  }

  static async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    try {
      if (!candidatePassword || !hashedPassword) {
        return false;
      }

      return await argon2.verify(hashedPassword, candidatePassword);
    } catch (error) {
      console.error('Password comparison failed:', error.message);
      return false;
    }
  }

  static async needsRehash(hashedPassword: string): Promise<boolean> {
    try {
      return argon2.needsRehash(hashedPassword, this.ARGON2_OPTIONS);
    } catch (error) {
      console.error('Rehash check failed:', error.message);
      return false;
    }
  }
}

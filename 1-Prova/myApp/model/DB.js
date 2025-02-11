import * as SQLite from 'expo-sqlite';

export default class DB {
  static db = null;

  // Verifica che il database sia stato aperto
  static async checkDB() {
    if (this.db === null) {
      await this.openDB();
    }
  }

  // Apre il DB e crea la tabella se non esiste
  static async openDB() {
    this.db = await SQLite.openDatabaseAsync('databaseName');
    const query = 'CREATE TABLE IF NOT EXISTS Images (mid INTEGER PRIMARY KEY, version INTEGER, image BLOB);';
    try {
      // Utilizzo di execAsync per eseguire la query di inizializzazione
      await this.db.execAsync(query);
    } catch (err) {
      console.error('Errore durante la creazione della tabella:', err);
    }
  }


  static async getImage(mid, version) {
    await this.checkDB();
    try {
      // Utilizziamo getFirstAsync per ottenere la prima (ed unica) riga che corrisponde al mid
      const row = await this.db.getFirstAsync('SELECT * FROM Images WHERE mid = ?', [mid]);
      if (!row) {
        // Nessun record trovato
        return "NOT_FOUND";
      }
      if (row.version === version) {
        // Versione corretta, restituisco l'immagine
        return row.image;
      } else {
        // Il mid è presente ma la versione non corrisponde
        return "VERSION_MISMATCH";
      }
    } catch (err) {
      console.error("Errore in getImage:", err);
      throw err;
    }
  }

  /**
   * Aggiunge un nuovo record con mid, version e image.
   * Utilizza runAsync per operazioni di scrittura.
   */
  static async addImage(mid, version, image) {
    await this.checkDB();
    try {
      await this.db.runAsync(
        'INSERT INTO Images (mid, version, image) VALUES (?, ?, ?)',
        [mid, version, image]
      );
      return true;
    } catch (err) {
      console.error("Errore in addImage:", err);
      throw err;
    }
  }

  /**
   * Aggiorna il record esistente identificato dal mid con una nuova versione e immagine.
   * Utilizza runAsync per l'operazione di scrittura.
   */
  static async updateImage(mid, version, image) {
    await this.checkDB();
    try {
      await this.db.runAsync(
        'UPDATE Images SET version = ?, image = ? WHERE mid = ?',
        [version, image, mid]
      );
      return true;
    } catch (err) {
      console.error("Errore in updateImage:", err);
      throw err;
    }
  }
}
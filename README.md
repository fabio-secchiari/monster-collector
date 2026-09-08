# 🥤 Monster Energy Tracker

> Il tracker definitivo per i collezionisti di Monster Energy – tieni traccia di ogni lattina, variante ed edizione limitata.

![Monster Energy Tracker](assets/ui/screenshot.png)

---

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Anteprima](#-anteprima)
- [Installazione](#-installazione)
- [Come usare](#-come-usare)
- [Struttura del database](#-struttura-del-database)
- [Personalizzazione](#-personalizzazione)
- [Tecnologie utilizzate](#-tecnologie-utilizzate)
- [Contribuisci](#-contribuisci)
- [Licenza](#-licenza)

---

## ✨ Caratteristiche

- **📦 Database completo** – Oltre 90 lattine Monster con tutte le varianti, edizioni limitate e collaborazioni (Valentino Rossi, Lando Norris, Lewis Hamilton, Oscar Piastri, Call of Duty e molte altre)
- **🎨 Vista Locker & Scaffale** – Due modalità di visualizzazione per gestire la collezione
- **⭐ Valutazione a stelle** – Assegna un voto a ogni variante (da 1 a 5 stelle)
- **📝 Note personalizzate** – Aggiungi appunti e ricordi per ogni variante
- **🔍 Filtri avanzati** – Filtra per rarità, serie, posseduti e limited edition
- **📸 Esporta Immagine** – Crea un'immagine della tua collezione completa o di una lattina singola
- **💾 Import/Export JSON** – Salva e condividi la tua collezione
- **🎵 Musica di sottofondo** – Attiva/disattiva con il tasto `M` (con GIF animata!)
- **⌨️ Scorciatoie da tastiera** – Navigazione rapida con tasti dedicati
- **📱 Responsive** – Funziona perfettamente su desktop, tablet e mobile
- **🖼️ Sfondo immagini** – Attiva uno sfondo JPG personalizzato per tutte le immagini delle lattine

---

## 🖼️ Anteprima

| Vista Locker | Vista Scaffale |
|--------------|----------------|
| ![Locker View](assets/ui/screenshot-locker.jpg) | ![Shelf View](assets/ui/screenshot-shelf.jpg) |

---

## 🚀 Installazione

### Prerequisiti

- Un browser web moderno (Chrome, Firefox, Edge, Safari)
- (Opzionale) Un server locale per lo sviluppo

### Download

```bash
git clone https://github.com/fabio-secchiari/monster-collector.git
cd monster-collector
```

---

## Struttura cartelle

```text
monster-tracker/
├── index.html
├── README.md
├── assets/
│   ├── icons/
│   │   ├── logo.png
│   │   └── logo-extended.png
│   ├── ui/
│   │   ├── background.jpg
│   │   ├── shelf.jpg
│   │   ├── sfondo-lattine.jpg
│   │   └── greenflame.gif
│   ├── audios/
│   │   └── music.mp3
│   └── monster/
│       ├── classic/
│       ├── ultra/
│       ├── juice/
│       ├── java/
│       ├── rehab/
│       ├── reserve/
│       ├── special/
│       ├── hydro/
│       ├── muscle/
│       ├── beast/
│       └── dragon/
```
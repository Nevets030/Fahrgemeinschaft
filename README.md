# Fahrgemeinschaft – Paul, Martin & Steven

Kleine Web-App, um einzutragen, wer wann mit wem gefahren ist. Die App
berechnet automatisch, wer als Nächstes "dran" ist (wer am wenigsten oft
gefahren ist, bei Gleichstand: wer am längsten nicht mehr dran war).

## Struktur

- `public/index.html` – die eigentliche App (Formular, Verlauf, Anzeige "wer ist dran")
- `netlify/functions/trips.js` – Netlify Function, speichert die Fahrten zentral
  für alle drei Personen über **Netlify Blobs** (kein externer Dienst nötig)
- `netlify.toml` – Netlify-Konfiguration

## Deployment auf Netlify

**Variante A – über Git (empfohlen):**
1. Dieses Projekt in ein Git-Repo packen (z.B. GitHub) und pushen.
2. Auf [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project".
3. Repo auswählen. Build-Einstellungen werden automatisch aus `netlify.toml` übernommen
   (kein Build-Befehl nötig, Publish-Verzeichnis ist `public`).
4. Deploy klicken – fertig. Netlify Blobs braucht keine zusätzliche Konfiguration.

**Variante B – über die Netlify CLI (ohne Git):**
```bash
npm install -g netlify-cli
cd fahrgemeinschaft
netlify deploy --prod
```
Bei der ersten Ausführung fragt die CLI nach Login und ob ein neues Projekt
angelegt werden soll. Publish-Verzeichnis: `public`, Functions-Verzeichnis:
`netlify/functions`.

## Nutzung

- Alle drei können die URL öffnen (am besten als Lesezeichen / Homescreen-Icon
  auf dem Handy speichern).
- Fahrt eintragen: Fahrer auswählen, Mitfahrer anklicken, Datum prüfen, "Fahrt
  eintragen" drücken.
- Oben wird immer angezeigt, wer laut Fahrverlauf als Nächstes dran ist.
- Einträge lassen sich im Verlauf über "Löschen" korrigieren.

Die Daten liegen zentral bei Netlify (Blobs) – alle drei sehen denselben Stand,
unabhängig vom Gerät.

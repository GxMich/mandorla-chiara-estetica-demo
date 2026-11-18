# Mandorla Chiara Estetica — sito dimostrativo

**Demo online → https://gxmich.github.io/mandorla-chiara-estetica-demo/**

> ### Attività di fantasia
>
> **Mandorla Chiara Estetica non esiste.** Nome, indirizzo a Borgo Sorive (un paese
> inventato), telefono, email, partita IVA, orari, prezzi e promozione sono inventati
> e servono solo a mostrare il funzionamento del sito.
>
> L'email usa il dominio `mandorla-chiara-estetica.example`: `.example` è un TLD
> riservato dallo IANA e non può recapitare posta a nessuno. Il telefono è
> `+39 000 000 0000`.
>
> La pagina ha `<meta name="robots" content="noindex, nofollow">` e il `robots.txt`
> blocca tutto il sito: un'attività inesistente non deve finire nelle ricerche locali.

Sito realizzato da [Michele Modica](https://www.modicamichele.it).

## Cosa mostra la demo

Una landing page per una promozione di un centro estetico, pensata per chi arriva
da un'inserzione sui social e la apre dal telefono:

- **Hero** con la promozione, lo sconto e due azioni: WhatsApp e chiamata.
- **Il rituale in due parti**: cosa succede in cabina e cosa si porta a casa.
- **Domande frequenti** con `details`/`summary` nativi: prezzo, durata, prenotazione.
- **Contatti e orari**, con indirizzo e prenotazione online.
- **Barra fissa su mobile** con Chiama e WhatsApp: compare quando i pulsanti
  dell'hero escono dallo schermo e sparisce quando arrivano quelli finali.

WhatsApp, prenotazione online e indicazioni stradali sono **simulati**: al clic
compare un avviso che spiega cosa succederebbe con un centro vero. Non viene aperto
né inviato niente.

## Tecnologie

- HTML, CSS e JavaScript senza framework e senza build.
- Testi, recapiti e immagini della promozione in `config.js`: per cambiare offerta
  si modifica un solo file.
- Font da Google Fonts: Bodoni Moda e Manrope.
- Foto in WebP, con una versione più leggera per i telefoni (`srcset`).
- Animazioni ridotte con `prefers-reduced-motion`.

## Come avviarla

Basta aprire `index.html` nel browser. In alternativa, con un piccolo server:

```bash
python -m http.server 4173
```

e poi `http://localhost:4173`.

## Struttura

```
index.html        La pagina
styles.css        Stili
config.js         Dati della promozione e dei recapiti (di fantasia)
app.js            Applica config.js, barra fissa su mobile, azioni simulate
assets/           Foto, favicon
robots.txt        Blocca l'indicizzazione
CREDITI-FOTO.md   Autori e licenze delle foto
```

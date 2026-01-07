
Opis funkcionalnosti

Glavne stranice:

1. Početna stranica (index.html)
- Pregled informacija o IPI Akademiji
- Navigacijski meni
- Footer sa copyright informacijama

2. Popis kurseva (popis.html)
- Detaljan pregled dostupnih kurseva
- Opisi i sadržaji kurseva

3. Raspored (raspored.html)
- Pregled rasporeda kurseva
- Vrijeme održavanja

4. Kontakt (kontakt.html)
- Kontakt forma za upite
- Podaci za kontakt

5. Student Fun Zone (StudentFunZone.html)
Centralna stranica sa iframe integracijom koja učitava:Interaktivni Whiteboard, Vision Board i Kanban Board.

Interaktivne komponente - Student Fun Zone

1. Interaktivni Whiteboard

Funkcionalnosti:
- Crtanje mišem na canvas elementu
- Odabir boje pomoću color picker-a
- Podešavanje veličine kista (1-20px)
- Brisanje (eraser mod)
- Čišćenje cijele ploče
- Snimanje kao PNG slika
- Snimanje kao PDF
- Slanje emailom (mailto metoda)

Način korištenja:
1. Odaberite boju pomoću color picker-a
2. Podesite veličinu kista pomoću slider-a
3. Kliknite i povucite miš po ploči za crtanje
4. Koristite "Briši" za eraser mod
5. "Očisti sve" za reset ploče
6. "Snimi kao PNG" - preuzima sliku crteža
7. "Snimi kao PDF" - kreira PDF dokument
8. "Pošalji mailom" - otvara modal za unos email adrese

Tehnologije:
- Canvas API za crtanje
- jsPDF za PDF export
- mailto protokol za email


2. Vision Board

Funkcionalnosti:
- Dodavanje Post-It bilješki (6 različitih boja)
- Dodavanje motivacionih citata
- Dodavanje slika
- Drag & Drop pomeranje elemenata
- Uređivanje sadržaja (contentEditable)
- Brisanje pojedinačnih elemenata (X dugme na hover)
- Spremanje u localStorage
- Snimanje kao PDF
- Slanje emailom

Način korištenja:
1. "Post It" - dodaje novu bilješku nasumične boje
2. "Citat" - dodaje motivacioni citat
3. "Slika" - dodaje nasumičnu sliku
4. Kliknite i povucite element za premještanje
5. Dvostruki klik na bilješku/citat za uređivanje teksta
6. Hover preko elementa i kliknite X za brisanje
7. "Snimi" - sprema stanje u localStorage
8. "Očisti ploču" - briše sve elemente
9. "Snimi kao PDF" - konvertuje ploču u PDF
10. "Pošalji mailom" - otvara email modal

Tehnologije:
- DOM manipulacija
- localStorage API
- Drag & Drop API
- html2canvas za konverziju u sliku
- jsPDF za PDF kreiranje


3. Kanban Board

Funkcionalnosti:
- Kreiranje task-ova putem modala
- Tri kolone: To Do, In Progress, Done
- Drag & Drop pomeranje task-ova između kolona
- Spremanje stanja ploče
- Čišćenje cijele ploče (sa confirm modal-om)
- Snimanje kao PNG
- Snimanje kao PDF
- Slanje emailom

Način korištenja:
1. "Dodaj zadatak" - otvara modal za unos task-a
2. Unesite opis zadatka i kliknite "Dodaj"
3. Task se pojavljuje u "To Do" koloni
4. Povucite task mišem u drugu kolonu (In Progress ili Done)
5. "Snimi" - sprema trenutno stanje
6. "Očisti ploču" - briše sve task-ove (sa potvrdom)
7. "Snimi kao PDF" - kreira PDF izvještaj ploče
8. "Pošalji mailom" - omogućava slanje putem email-a

Tehnologije:
- Drag & Drop API
- Modal dialozi
- html2canvas za screenshot
- jsPDF za PDF export


Mailto funkcionalnost

Sve tri glavne komponente (Whiteboard, Vision Board, Kanban Board) imaju opciju slanja emailom.

Kako funkcionira:
1. Kliknite dugme "Pošalji mailom"
2. Pojavljuje se modal prozor
3. Unesite email adresu primaoca
4. Kliknite "Pošalji"
5. Otvara se vaš email klijent sa popunjenim podacima

Napomena: Zbog sigurnosnih ograničenja mailto protokola, slike i PDF-ovi se ne mogu direktno priložiti u email. Preporuka je da prvo preuzmete datoteku (PNG/PDF), pa je ručno priložite u email kao attachment.


Tehnologije korištene u projektu

Frontend:
- HTML5 - Semantička struktura stranica
- CSS3 - Stilizacija, flexbox, responzivni dizajn
- JavaScript (Vanilla) - Interaktivnost bez frameworka

API-ji i biblioteke:
- Canvas API - Za crtanje na Whiteboard-u
- Drag & Drop API - Za pomeranje elemenata
- localStorage API - Trajno spremanje podataka u browseru
- jsPDF - Generisanje PDF dokumenata
- html2canvas - Konverzija HTML u sliku
- mailto protokol - Slanje email-a

Alati za razvoj:
- Visual Studio Code
- Git & GitHub
- Live Server (VS Code ekstenzija)


Dizajn i stilizacija

- Responzivan dizajn prilagođen različitim ekranima
- Moderna paleta boja
- Flexbox layout za poravnanje
- Modal popups sa overlay efektom
- Hover efekti i animacije
- Drop shadows i zaobljeni rubovi (border-radius)
- Transparentni background efekti


Poznati problemi i ograničenja

1. Mailto ograničenja: Mailto protokol ne podržava direktno prilaganje slika i PDF-ova zbog sigurnosnih razloga browsera.
2. localStorage limit: Ima ograničenje od 5-10MB, ali je dovoljno za ovaj projekat.
3. iframe kompatibilnost: Neki browseri mogu imati ograničenja sa iframe sadržajem ako se koristi lokalno (file:// protokol).

Preporuka: Koristite lokalni web server (Live Server) umjesto direktnog otvaranja HTML fajlova.



Verzija 1.0 (Novembar 2025)
- Implementirana osnovna struktura web stranice
- Dodane sve stranice (O kursevima, Popis, Raspored, Kontakt)
- Implementirana Student Fun Zone sa iframe integracijom
- Kreiran Interaktivni Whiteboard sa canvas funkcionalnostima
- Kreiran Vision Board sa drag & drop
- Kreiran Kanban Board sa task management-om
- Dodati PDF export za sve komponente
- Dodati mailto funkcionalnost za slanje emailom
- Responzivan dizajn
- Dokumentacija u README.md


Autor

[Haris Alić]
Student Web programiranja
Internacionalna poslovno-informaciona akademija Tuzla
Godina: 2025


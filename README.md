# Aplikacja Webowa Systemu Sprzedaży Biletów

# Wstęp 
Aplikacja Webowa dostępna w niniejszym repozytorium jest częścią większego systemu - System Sprzedaży Biletów. Jednocześnie stanowi jego największą i najbardziej rozbudowaną część. Cały system - projekt, implementacja oraz badania były tematem mojej pracy inżynierskiej.

## Praca inżynierska wraz ze szczegółową dokumentacją oraz wyglądem ekranów aplikacji:
[Dokumentacja.pdf](./images/Marcin_Krol_System_sprzedazy_biletow.pdf)

# Opis projektu
Aplikacja webowa umożliwia użytkownikom przeglądanie i wyszukiwanie dostępnych wydarzeń, a także wybieranie najlepszych miejsc w sali na podstawie „schematu” miejsc. Po wybraniu biletów, użytkownicy mogą dokonać płatności. Aplikacja umożliwia również organizatorom wydarzeń łatwe dodawanie nowych wydarzeń i zarządzanie sprzedażą biletów poprzez interfejs administracyjny. Organizatorzy mogą także skorzystać z narzędzi analitycznych, aby śledzić sprzedaż biletów i dostosowywać ceny w zależności od popytu. Głównym celem aplikacji jest, aby użytkownicy mogli łatwo i szybko kupować bilety na swoje ulubione wydarzenia, a organizatorzy posiadali pełną kontrolę nad sprzedażą biletów i wglądem do danych analitycznych, które pomogą im w podejmowaniu decyzji biznesowych. 

Część serwerowa: https://github.com/Makolojka/BiletSfera-Server
Część mobilna: https://github.com/Makolojka/BiletSfera-Mobile

***
## Ekrany aplikacji

### Strona główna
<kbd><img src="./images/home_2.png" width="800" /></kbd>
***

### Rejestracja/Logowanie
<kbd><img src="./images/register.png" width="800" /></kbd>
***

### Wyszukiwanie
<kbd><img src="./images/wyszukiwanie.png" width="800" /></kbd>
***

### Dodawanie biletu do koszyka
<kbd><img src="./images/add.png" width="800" /></kbd>
***

### Wyszukiwanie organizatorów
<kbd><img src="./images/artysty.png" width="800" /></kbd>
***

### Przykładowy szablon kina
<kbd><img src="./images/cinemaroom.png" width="800" /></kbd>
***

### Historia transakcji
<kbd><img src="./images/historia.png" width="800" /></kbd>
***

### Formularz rejestracji organizatora
<kbd><img src="./images/oragnizer register.png" width="800" /></kbd>
***

### Panel organizatora - aktywne wydarzenia
<kbd><img src="./images/aktywne2.png" width="800" /></kbd>
***

### Panel organizatora - tworzenie wydarzenia
<kbd><img src="./images/nowe wydarzenia.png" width="800" /></kbd>
***

# Uruchomienie projektu
Aby, uruchomić projekt należy znajdować się w terminalu w odpowiednim folderze(ścieżce) i wywołać komendę '_npm start_'

Część kliencka dostępna jest pod adresem: 
> http://localhost:4200/

***

## Diagram ERD
<kbd> <img src="./images/ERD.png" /> </kbd>

## Dokumentacja API
Szczegółowa dokumentacja API dostępna jest z poziomu interfejsu swagger.io. <br>
<br>Po włączeniu serwera dokumentację można znaleźć pod adresem: 
> http://localhost:3001/api-docs/#/<br>
> 
> 
***
<kbd> <img src="./images/api1.png" /> </kbd>
<kbd> <img src="./images/api2.png" /> </kbd>
<kbd> <img src="./images/api3.png" /> </kbd>
<kbd> <img src="./images/api4.png" /> </kbd>
<kbd> <img src="./images/schemas.png" /> </kbd>

# Technologie użyte w projekcie
- node.js
- express.js
- swagger.io
- angular 16
- mongo.db
- javascript/typescript

***

## Autor
Marcin Król

# EventHub Mini – krav, analys och prototyp

## Problem statement
Det är krångligt för små arrangörer att hålla koll på event, venues och biljetter när man använder “lite av allt” (Instagram, Excel, Swish-listor). Resultatet blir dubbelbokningar, otydlig biljettstatus och mycket manuellt arbete vid insläpp.

EventHub Mini är en liten lösning som visar flödet från att en besökare hittar ett event till att den köper en biljett, och att en admin kan se en enkel översikt.

## Stakeholders
- **Guest (besökare):** vill hitta event och se detaljer utan konto.
- **User (deltagare/köpare):** vill köpa biljett och få bekräftelse.
- **Admin (arrangör):** vill skapa event, se biljetter och kapacitet/översikt.
- **Venue owner (lokalansvarig):** vill se bokningar i sin lokal (i större version).

## Kravlista (med prioritering – MoSCoW)

### Funktionella krav
1. **[M]** Systemet ska lista kommande event med titel, datum, venue och pris.
2. **[M]** Användaren ska kunna öppna en eventsida med detaljer.
3. **[M]** Användaren ska kunna “köpa” biljett genom att fylla i ett formulär och skicka.
4. **[S]** Systemet ska visa en enkel tabell med “historik/översikt” över nyliga köp/bokningar.
5. **[S]** Systemet ska stödja filtrering av eventlistan via sökfält (live filter).
6. **[C]** Admin ska kunna skapa nya events (ej implementerat, endast modellerat).
7. **[C]** Admin ska kunna se kapacitet och antal sålda biljetter per event (översikt, modellerat).
8. **[W]** Systemet ska kunna hantera rabattkoder (utanför scope).

### Icke-funktionella krav
9. **[M]** Tillgänglighet: all navigering ska fungera med tangentbord, semantisk HTML, labels till inputs.
10. **[M]** Användbarhet: tydligt flöde “List → Detail → Purchase”.
11. **[S]** Prestanda: listfiltrering ska kännas direkt för upp till ~100 events (klientside).

## 1 Use Case (komplett) – “Köp biljett”
- **Actor:** User (deltagare/köpare)
- **Goal:** Köpa biljett till valt event
- **Preconditions:**
  - Eventet finns och är synligt i listan.
  - Det finns tillgängliga platser (i prototyp antas “ja”).
- **Main flow:**
  1. User öppnar startsidan och väljer ett event.
  2. Systemet visar eventdetaljer och biljettformulär.
  3. User fyller i namn, e-post, antal biljetter och biljett-typ.
  4. User skickar formuläret.
  5. Systemet visar “Tack! Din bokning är registrerad” (prototyp-text) och uppdaterar översikt (simulerad).
- **Alternate flow (A1): Formulär saknar obligatoriskt fält**
  - 3a. User lämnar t.ex. e-post tom.
  - 3b. Systemet stoppar submit och visar HTML-validering.
  - 3c. User kompletterar och fortsätter.
- **Postconditions:**
  - En TicketOrder finns registrerad med status “Pending/Confirmed” (i prototyp simuleras).

## Change note (2 ändringar under veckan)
1. **Ändring:** Lade till live-filter på startsidan.  
   **Varför:** För att visa en tydlig micro interaction och förbättra “findability”.
2. **Ändring:** Bytte “Boka plats” till “Köp biljett” i UI-texter.  
   **Varför:** För att matcha domänen event/biljetter och undvika “gym-bokning”-känsla.

## Kort domänanalys (OO-tänk)
Domänen kretsar kring att ett **Event** hålls på ett **Venue**, och att en användare skapar en **TicketOrder** som innehåller en eller flera **Ticket**. Status på ordern kan modelleras som enum (Pending/Confirmed/Cancelled). Kapacitet ligger på Venue eller Event, beroende på hur detaljerad modellen är.

anthill
=======

Wanna English? Gotta wait!


##Úvod
Anthill je počítačová simulace chování mravenců.
Zkládá se ze tří částí:
* Zavaděč - `index.xhtml`
* Jádro - `enviro.js`, `engine.js`,  `style.css`
* Moduly - vše ve složce `modules`

##Zavaděč
Index je uživatelsky nejpřístupnější část projektu. Zde se pomocí xml nastavují moduly, které se mají spustit. Nejprve je nutné spustit modul pro vytvoření mapy, poté je možné načíst nějaký algoritmus pohybu mravenců (neboli inteligenční modul). Moduly se spouštějí uvnitř těla html dokumentu (`<html:body>`) pomocí skriptů. Element `<html:script>` musí obsahovat atribut `src` udávající relativní cestu ke skriptu a většinou obsahuje také atributy nastavení (začínající na `data-`). Atributy nastavení jsou specifické pro každý modul.

Příklad nastavení:
```xml
<html:script
 src="./modules/maps/empty.js"
 data-width ="10"
 data-height="10"
/>
<html:script
 src="./modules/intel/langton.js"
 data-x="4"
 data-y="3"
 data-a1="1"
 data-a2="5"
 data-start-angle="0"
 data-time="1000"
/>
```
Pozn.: Spustí langtonova mravence na prázdné mapě 10x10, langtonův mravenec bude začínat na poli `[x,y]=[4,3]` a bude postupovat v krocích po jedné vteřině. Konfigurace mravence je `1,5` a délka kroku je 1 sekunda.

##Jádro
Jádro se zkládá ze souborů `enviro.js`, které v tomto dokumentu nebudu nijak zvlášť popisovat - jeho kód mluví za vše, `style.css` a `engine.js`.
Engine pracuje na principu šestiúhelníkové mřížky. Mapa světa je dostupná pod globální proměnnou `window.World`, fungují zde dva typy souřadnic - `[x,y]` (prioritní) a `[q,r]`. Více informací o souřadnicích naleznete [zde](http://www.redblobgames.com/grids/hexagons/) (použité souřadnicové systémy: even-r & axial). Vykreslování obsluhuje prohlížeč, v DOMu je mapa reprezentována elementy `<row>` pro řádky a elementy `<cell>` pro jednotlivé buňky.

##Moduly
Tahle část projektu je navržená tak, aby byla co nejlépe rozšiřitelná. Veškerý kód v modulech je uzavřený do takovéto konstrukce: `(function(){ ... })();`. To je proto, aby _nezamořoval_ prostor svými proměnnými - tento kód je totiž uzavřen do funkce, která se _posléze_ sama spustí - proměnné definované ve funkci zůstávají ve funkci. Pokud byste přeci jen chtěli vytvořit globální proměnnou, použijte objekt `window` (např. k `window.foo` lze přistupovat jako k `foo`, ale bude definováno globálně).

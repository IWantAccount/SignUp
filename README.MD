# SignUp

## Spuštění

### Docker
Pro spuštění aplikace v podobě docker kontejnerů je potřeba Docker Compose a mít vyplněnou konfiguraci v compose.yaml.
Je možné nechat vychozí hodnoty. Pro veřejný provoz je vhodné změnit heslo k databázi (v compose.yaml POSTGRES_PASSWORD)
a secret pro podepisování JWT (v compose.yaml JWT_SECRET, alespoň 256 bitů).

Pro spuštění pak stačí příkaz
```
docker compose up -d --build
```
Frontend v tomto případě běží na portu 80. Je potřeba mít tento port volný.

Systém je pak možné vypnout pomocí
```
docker compose down
```
Pokud chcete vyprázdnit databázi, můžete přidat přepínač -v.
### Dev prostředí
Systém je možné spouštět ve vývojovém prostředí, což se hodí zejména pro práci s NPM dev serverem a využití jeho
hot module reload.

Pro běh celého systému je potřeba, aby byl k dispozici databázový server. Ten je možné spustit příkazem
```
docker compose up -d db
```

Pro spuštění backendu je potřeba Java 21 a Gradle.
Backend lze spustit na UNIXovém systému následující posloupností příkazů.
```
cd be
./gradlew clean build
./gradlew bootRun
```
Backend se v takovém případě spustí na portu 8080. Je potřeba mít tento port volný.

Pro spuštění dev frontend serveru je potřeba Node ve verzi 22 nebo vyšší.
Dev server lze spustit na UNIXovém systému následující posloupností příkazů.
```
cd fe
npm ci
npm run dev
```
Dev server se spustí na portu 3000.

## Config
Základním konfiguračním souborem pro backend je application.properties.
Pokud je backend spouštěný jako docker kontejner uplatní se application-docker.properties, který přebírá většinu konfigurace z compose.yaml.

Konfigurace pro běh mimo kontejner se tedy nastavují v application.properties a konfigurace pro běh v kontejneru v compose.yaml.

### Vznik prvního uživatele
Pokud má systém prázdnou databázi, nemáme administrátorský účet ani žádný jiný účet, se systémem se tak nedá nijak pracovat (kromě SQL konzole databáze).
Backend proto nabízí konfiguraci, která umožní uživatele vytvořit. V application.properties to jsou položky init-user.* a compose.yaml
INIT_*

Je možné sem vyplnit jméno, heslo, email. Pokud je navíc vyplněné položka enabled s hodnotou true, systém při spuštění zkontroluje, zda uživatel s vyplněným jménem existuje a pokud ne, založí ho s rolí admin.

Položku enabled je nutné mít vyplněnou pro spuštění systému. Pokud je enabled=true, pak je nutné mít vyplněné i zbývající položky (jméno, email, heslo). 

### JWT

Backend vydává Json Web Token (JWT). Zde je možné konfigurovat dvě vlastnosti JWT:
* Secret, kterým se podepisuje JWT. Předaná hodnota by měla mít alespoň 256 bitů. Nastavuje se v application.properties přes jwt.secret a v compose.yaml pomocí JWT_SECRET.
* Doba platnosti JWT v minutách. Nastavuje se v application.properties přes jwt.valid-in-minutes a v compose.yaml přes JWT_VALID_IN_MINUTES


### Ukládání souborů
Backend za běhu pracuje se soubory.
Potřebuje místo, kam soubory ukládat a odkud je načítat.
Adresář, se kterým může backend pracovat je možné upravit v application.properties pro spouštění mimo Docker kontejner.
Pro spouštění v docker kontejneru je možné toto upravit v compose.yaml volumes.
Je nutné, aby proces, ve kterém běží backend, měl dostatečná zápisová práva do předaného adresáře.

Je možné konfigurovat maximální velikost videí.
* spring.servlet.multipart.max-file-size v application.properties nastavuje maximální velikost souboru, který je ochotný endpoint přijmout.
* v nginx.conf client_max_body_size určuje maximální velikost souboru, který je ochotný odeslat nginx (platné jen pro spouštění frontendu v Docker kontejneru).
* video.max-size v application.properties určuje maximální velikost videa, kterou je ochotný ukládat backend.

Teoreticky je možné konfigurovat povolené přípony videí, které přijámá backend, a to v application.properties video.allowed-types, ale nedoporučuji to dělat, protože pro formáty videí jiné než .webm a .mp4 nemusí backend správně nastavit hlavičky.

## Organizace kódu
Pro rychlou orientaci v kódu
### Backend
Backend je Spring Boot aplikace. Zdrojové kódy jsou v be/src.

* api/ obsahuje controllery, jsou zde definované endpointy. Důležitou třídu tam je GlobalExceptionHandler, který zachytává výjimky a posílá informace o chybě.
* business/ obsahuje servisní třídy, specifikace a definice DTO.
* config/ jsou třídy, které umožňují externí konfiguraci
* exception/ vlastní výjimky
* persistence/ obsahuje definice datových tříd a jejich repozitáře
* security/ třídy potřebné pro zabezpečení backendu
* util/ menší pomocné třídy
### Frontend
Frontend je React SPA. Zdrojové kódy jsou v fe/src.

* api/ obsahuje logiku pro volání endpointů. Každá třída tady zpravidla má soubory
  * dto s definicí data acess objektů
  * query-options s konfigurací knihovny TanStack Query
  * api s axios voláními na backend
* components/ obsahuje React komponenty (zejména z Material UI)
* routes/ rozložení stránek v aplikaci. Podadresáře jsou tvořené podle tříd. Každá třída má zpravidla
  * create - vytvoření nové instance
  * index - výpis všechn instancí dané třídy
    * $id/edit pro úpravu instance
    * $id/index pro detail instance (ne všude, někde to nedává smysl)

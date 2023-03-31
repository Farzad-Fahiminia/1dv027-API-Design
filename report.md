# Report

## 1. Explain and defend your implementation of HATEOAS in your solution.
HATEOAS gör det lättare för användare att upptäcka API:ns förmågor och resurser genom att tillhandahålla länkar och metadata i responsen. Användare kan följa länkarna för att hitta nya resurser och åtgärder utan att behöva förlita sig på extern dokumentation eller förkunskaper om API:ns struktur.

## 2. If your solution should implement multiple representations of the resources. How would you do it?
Jag förstår inte frågan riktigt, men om jag ska anta vad ni menar är det en fördel att välja den mest lämpliga formatet (JSON, XML, HTML) av en resurs baserat på vad användaren föredrar och vad servern kan behandla. Användaren kan specificera vad hen föredrar genom en HTTP Accept header i förfrågan, och servern kan svara med det format som bäst matchar användaren.

## 3. Motivate and defend your authentication solution.
Access tokens och JWT för autentisering en skalbar, säker, stateless, flexibel. Det är en vanlig lösning för moderna webbapplikationer. Det möjliggör en centraliserad autentiseringssystem som minskar serverns arbetsbelastning och ger ett säkert och effektivt sätt att autentisera användare över olika applikationer.

### 3a. What other authentication solutions could you implement?
Det finns andra autentiseringsmetoder man kan använda sig av som t.ex. OAuth, OpenID Connect, Multi-factor.

### 3b. What are the pros/cons of this solution?
#### Fördelar
Eftersom access tokens och JWT är signaturerade, kan mottagaren verifiera att tokenet är giltigt och inte manipulerat (säker). Detta minskar risken för identitetsstöld och bedrägerier. JWT innehåller all nödvändig information i sig själv, så behöver inte servern lagra någon ytterligare information om användaren. Detta gör autentiseringen stateless och förenklar hanteringen på servern. Access tokens och JWT kan användas i olika miljöer och plattformar, och kan också användas för att säkra både webbapplikationer och mobila appar.

#### Nackdelar
Implementeringen av access tokens och JWT kan kräva tid och resurser, inklusive programmering och integration med andra tjänster. Access tokens och JWT kan stjälas av en illvillig parter och användas för att få åtkomst till resurser och data. Detta kan ske om tokenet inte hanteras säkert eller om webbapplikationen är sårbar för attacker.

## 4. Explain how your webhook works.
Min webhook registrerar användarens/besökarens url via en viss webhook-länk jag har skapat. Sedan lyssnar min webhook på om en record registreras på databasen. Om det tillkommer en ny record skickar min webhook ut notiser till alla registrerade att det har tillkommit en record med dess datainnehåll.

## 5. Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this.
Hade jag kunna utveckla API:et mer hade jag troligtvis lagt till att man kan filtrera ut enbart en viss artist med alla deras records. Eller filtrera efter årtal och liknande. Eventuellt adderat paginering så att man kan ladda in flera sidor av en respons.

## 6. Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why did you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API.
- rule 1: Forward slash separator (/) must be used to indicate a "hierarchical relationship".
- rule 2: A trailing forward slash (/) should not be included in URIs.
- rule 4: Underscores (_) should not be used in URIs.
- rule 5: Lowercase letters should be preferred in URI paths.
- rule 10: CRUD function names or their synonyms should not be used in URIs.
- rule 11: A verb or verb phrase should be used for controller names.

Ett kortare svar till alla punkter tillsammans:
Först och främst har jag följt dessa regler eftersom de är "best practice". Sedan kan man säga att mycket baseras att det hjälper att göra API:erna mer användarvänliga, lättlästa och förståliga. Punkterna ovan säger redan vad de tillför så jag låter bli att repetera dessa.

## 7. Did you do something extra besides the fundamental requirements? Explain them.
Nej, det har jag inte gjort.
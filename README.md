# Readable Reddit

Script utilisateur (Tampermonkey / Violentmonkey) qui rend Reddit plus lisible :

- **masque les posts de subreddits indésirables** dans les flux (accueil, r/popular, r/all, recherche…) ;
- **désactive la traduction automatique** des posts et commentaires.

Fonctionne sur le Reddit actuel (`www.reddit.com`) et sur `old.reddit.com`. Aucune dépendance.

## Installation

1. Installer [Tampermonkey](https://www.tampermonkey.net/) (ou Violentmonkey).
2. Ouvrir [`readable-reddit.user.js`](https://raw.githubusercontent.com/sisichakal/readablereddit/main/readable-reddit.user.js) : Tampermonkey propose l'installation.

Les mises à jour sont ensuite récupérées automatiquement depuis ce dépôt (`@updateURL`).

## Utilisation

Menu Tampermonkey → **Readable Reddit** → **Paramètres…**

- **Subreddits masqués** : un par ligne. `r/nom`, une URL complète (`https://www.reddit.com/r/nom/`) ou le nom seul
  sont acceptés ; la casse est ignorée.
- `*` est un joker : `*f1*` masque tout subreddit dont le nom contient « f1 », `formulaone*` ceux qui commencent
  par « formulaone ».
- **Désactiver la traduction automatique** : case à cocher (activée par défaut).

Les réglages sont stockés par Tampermonkey et synchronisés entre les onglets ouverts. Tant qu'aucune liste n'a été
enregistrée, c'est la liste par défaut du script (`aDefaultSubreddits`) qui s'applique. Ensuite, les entrées ajoutées
à cette liste par une mise à jour du script sont fusionnées dans la liste enregistrée, sans rétablir celles qui ont
été retirées à la main.

### Liste par défaut

`whatisit`, `weddingshaming`, `UKPersonalFinance`, `GTA6unmoderated`, `mildlyinfuriating`, `SubredditDrama`, `cats`,
`PeterExplainsTheJoke`, `GirlDinnerDiaries`, `antimeme`, `GTA6`, `LivestreamFail`, `wowforever`, `Linkedinfr`,
`IaCaca`, `tennis`, `StardustCrusaders`, `wow`, `chats`, `kingdomcome`, `TikTokCringe`, `rugbyunion`,
`Deltarune`, `leagueoflegends`, `countwithchickenlady`, `ExplainTheJoke`, `pathofexile*`, `CrusaderKings`.

- **Formule 1** : `*f1*`, `*formula1*`, `formulaone*`, `formuladank`.
- **Jeux gacha** : `*gacha*`, `*genshin*`, `*honkai*`, `HonkaiStarRail`, `houkai3rd`, `*starrail*`, `*zenless*`, `ZZZ_*`, `*wuthering*`,
  `*arknights*`, `Endfield`, `Nikke*`, `InfinityNikki`, `*bluearchive*`, `grandorder`, `FGO`, `UmaMusume*`, `AzureLane`,
  `limbuscompany`, `Reverse1999`, `PunishingGrayRaven`, `girlsfrontline*`, `SnowbreakOfficial`, `ChaosZeroNightmare`,
  `StellaSora`, `EpicSeven`, `AFKJourney`, `Granblue_en`, `FireEmblemHeroes`, `FFBraveExvius`, `DBZDokkanBattle`,
  `DragonballLegends`, `SummonersWar`, `RaidShadowLegends`.
- **MMORPG** : `MMORPG`, `classicwow`, `wownoob`, `CompetitiveWoW`, `ffxiv*`, `ShitpostXIV`, `TalesFromDF`,
  `guildwars*`, `elderscrollsonline`, `*runescape*`, `2007scape`, `ironscape`, `lostarkgame`, `blackdesertonline`,
  `newworldgame`, `throneandliberty`, `albiononline`, `Eve`, `swtor`, `lotro`, `Maplestory`, `AshesofCreation`,
  `PSO2`, `PSO2NGS`, `bladeandsoul`, `aion`, `TibiaMMO`, `everquest`, `project1999`, `Neverwinter`, `sto`, `ddo`,
  `Cityofheroes`, `Wizard101`, `Mabinogi`, `Lineage2`, `RagnarokOnline`, `DFO`, `Dofus`, `wakfu`.
- **FPS** : `*overwatch*`, `*valorant*`, `GlobalOffensive`, `cs2`, `csgo`, `counterstrike`, `CallOfDuty`,
  `CODWarzone`, `Warzone`, `CODZombies`, `CoDCompetitive`, `blackops*`, `ModernWarfare*`, `battlefield*`,
  `apexlegends`, `apexuniversity`, `CompetitiveApex`, `Rainbow6*`, `SiegeAcademy`, `halo`, `haloinfinite`,
  `CompetitiveHalo`, `DestinyTheGame`, `destiny2`, `LowSodiumDestiny`, `Doom`, `EscapefromTarkov`, `Tarkov`,
  `thefinals`, `tf2`, `PUBATTLEGROUNDS`, `titanfall`, `HuntShowdown`, `Splitgate`, `Borderlands*`, `farcry`,
  `HalfLife`, `quake`, `HellLetLoose`, `ReadyOrNotGame`, `paydaytheheist`, `DeepRockGalactic`, `killingfloor`, `l4d2`,
  `stalker`, `insurgency`, `joinsquad`, `arma`, `BattleBitRemastered`, `DeltaForceGlobal`, `Planetside`.
- **Jeux de foot** : `EASportsFC`, `EAFC`, `fut`, `FIFA`, `FifaCareers`, `FUTMobile`, `footballmanagergames`,
  `footballmanager`, `eFootball`, `WEPES`, `pesmobile`, `UFLTheGame`, `FantasyPL`.
- **Clubs de foot** : `reddevils`, `Gunners`, `LiverpoolFC`, `chelseafc`, `coys`, `MCFC`, `NUFC`, `avfc`, `Hammers`,
  `Everton`, `lcfc`, `LeedsUnited`, `nffc`, `WWFC`, `crystalpalace`, `BrightonHoveAlbion`, `realmadrid`, `Barca`,
  `atletico`, `ACMilan`, `Juve`, `FCInterMilan`, `ASRoma`, `sscnapoli`, `fcbayern`, `borussiadortmund`, `psg`,
  `Olympique*`, `ASMonaco`, `RCLens`, `ASSE`, `LOSC`, `FCNantes`, `staderennais`, `benfica`, `fcporto`, `SportingCP`,
  `AjaxAmsterdam`, `CelticFC`, `rangersfc`, `InterMiami`.

## Fonctionnement

### Masquage

- Un subreddit masqué reste consultable directement : sur `r/cats`, les posts de `r/cats` restent visibles.
- Les posts sont repérés par leurs métadonnées (`<shreddit-post subreddit-name="…">`, `data-subreddit` sur l'ancien
  Reddit), ou à défaut par leur premier lien `/r/…` (résultats de recherche).
- Les posts chargés au défilement sont traités avant d'être affichés (pas de clignotement).

### Traduction automatique

- Le paramètre `?tl=xx` (liens Google traduits, entre autres) est retiré de l'URL et des liens cliqués.
- Le cookie de préférence `reddit_translation_status` est forcé à `isTranslationActive: false` et maintenu dans cet
  état ; si la page a été servie traduite, elle est rechargée une fois.
- Un garde-fou limite les redirections/rechargements automatiques à 3 par tranche de 15 secondes et par onglet.

## Limites

- Reddit modifie régulièrement son HTML : si le masquage cesse de fonctionner, les sélecteurs sont regroupés dans
  `postSelector` et `aSubredditAttributes`.
- Seuls les posts sont masqués, pas les suggestions de communautés des panneaux latéraux.
- Les jokers (`*f1*`, `*gacha*`…) sont volontairement larges et peuvent masquer un subreddit sans rapport dont le nom
  contient ces lettres.

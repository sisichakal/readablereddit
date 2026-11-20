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
enregistrée, c'est la liste par défaut du script (`aDefaultSubreddits`) qui s'applique.

### Liste par défaut

`whatisit`, `weddingshaming`, `UKPersonalFinance`, `GTA6unmoderated`, `mildlyinfuriating`, `SubredditDrama`, `cats`,
`PeterExplainsTheJoke`, `GirlDinnerDiaries`, `antimeme`, `GTA6`, `LivestreamFail`, `wowforever`, `Linkedinfr`,
`IaCaca`, `tennis`, et la Formule 1 via `*f1*`, `*formula1*`, `formulaone*`, `formuladank`.

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
- Le joker `*f1*` est volontairement large et peut masquer un subreddit sans rapport dont le nom contient « f1 ».

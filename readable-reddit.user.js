// ==UserScript==
// @name            Readable Reddit
// @name:fr         Readable Reddit
// @namespace       https://github.com/sisichakal/readablereddit
// @version         1.4.0
// @description     Hides posts from unwanted subreddits in Reddit feeds and disables automatic machine translation.
// @description:fr  Masque les posts des subreddits indésirables dans les flux Reddit et désactive la traduction automatique.
// @match           https://*.reddit.com/*
// @run-at          document-start
// @noframes
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_registerMenuCommand
// @grant           GM_addValueChangeListener
// @homepageURL     https://github.com/sisichakal/readablereddit
// @supportURL      https://github.com/sisichakal/readablereddit/issues
// @downloadURL     https://raw.githubusercontent.com/sisichakal/readablereddit/main/readable-reddit.user.js
// @updateURL       https://raw.githubusercontent.com/sisichakal/readablereddit/main/readable-reddit.user.js
// ==/UserScript==

(() => {
    'use strict';

    // ---------------------------------------------------------------------
    // Defaults
    // ---------------------------------------------------------------------

    // Subreddit names are case-insensitive; "*" is a wildcard. Entries added
    // here in a later version are merged into the list the user has saved.
    const aDefaultSubreddits = [
        'whatisit',
        'weddingshaming',
        'UKPersonalFinance',
        'GTA6unmoderated',
        'mildlyinfuriating',
        'SubredditDrama',
        'cats',
        'PeterExplainsTheJoke',
        'GirlDinnerDiaries',
        'antimeme',
        'GTA6',
        'LivestreamFail',
        'wowforever',
        'Linkedinfr',
        'IaCaca',
        'tennis',
        'StardustCrusaders',
        'wow',
        'chats',
        'kingdomcome',
        'TikTokCringe',
        'rugbyunion',
        'Deltarune',
        'leagueoflegends',
        'countwithchickenlady',
        'ExplainTheJoke',
        'pathofexile*',
        'CrusaderKings',
        'dragonage*',
        '*rimworld*',
        'Undertale*',
        '*totalwar*',
        'shogun2',
        'vinted_france',
        'egg_irl',
        // Formula 1 (formula1, F1Technical, F1Game, McLarenFormula1, WilliamsF1…)
        '*f1*',
        '*formula1*',
        'formulaone*',
        'formuladank',
        // Gacha games (wildcards also cover the leaks / memes / fan-art spin-offs)
        '*gacha*',
        '*genshin*',
        '*honkai*',
        'HonkaiStarRail',
        'houkai3rd',
        '*starrail*',
        '*zenless*',
        'Zenlesszonezeroleaks_',
        'ZZZ_*',
        '*wuthering*',
        '*arknights*',
        'Endfield',
        'Nikke*',
        'InfinityNikki',
        '*bluearchive*',
        'grandorder',
        'FGO',
        'UmaMusume*',
        'AzureLane',
        'limbuscompany',
        'Reverse1999',
        'PunishingGrayRaven',
        'girlsfrontline*',
        'SnowbreakOfficial',
        'ChaosZeroNightmare',
        'StellaSora',
        'EpicSeven',
        'AFKJourney',
        'Granblue_en',
        'FireEmblemHeroes',
        'FFBraveExvius',
        'DBZDokkanBattle',
        'DragonballLegends',
        'SummonersWar',
        'RaidShadowLegends',
        // MMORPGs (r/wow is listed above)
        'MMORPG',
        'classicwow',
        'wownoob',
        'CompetitiveWoW',
        'ffxiv*',
        'ShitpostXIV',
        'TalesFromDF',
        'guildwars*',
        'elderscrollsonline',
        '*runescape*',
        '2007scape',
        'ironscape',
        'lostarkgame',
        'blackdesertonline',
        'newworldgame',
        'throneandliberty',
        'albiononline',
        'Eve',
        'swtor',
        'lotro',
        'Maplestory',
        'AshesofCreation',
        'PSO2',
        'PSO2NGS',
        'bladeandsoul',
        'aion',
        'TibiaMMO',
        'everquest',
        'project1999',
        'Neverwinter',
        'sto',
        'ddo',
        'Cityofheroes',
        'Wizard101',
        'Mabinogi',
        'Lineage2',
        'RagnarokOnline',
        'DFO',
        'Dofus',
        'wakfu',
        // First-person shooters
        '*overwatch*',
        '*valorant*',
        'GlobalOffensive',
        'cs2',
        'csgo',
        'counterstrike',
        'CallOfDuty',
        'CODWarzone',
        'Warzone',
        'CODZombies',
        'CoDCompetitive',
        'blackops*',
        'ModernWarfare*',
        'battlefield*',
        'apexlegends',
        'apexuniversity',
        'CompetitiveApex',
        'Rainbow6*',
        'SiegeAcademy',
        'halo',
        'haloinfinite',
        'CompetitiveHalo',
        'DestinyTheGame',
        'destiny2',
        'LowSodiumDestiny',
        'Doom',
        'EscapefromTarkov',
        'Tarkov',
        'thefinals',
        'tf2',
        'PUBATTLEGROUNDS',
        'titanfall',
        'HuntShowdown',
        'Splitgate',
        'Borderlands*',
        'farcry',
        'HalfLife',
        'quake',
        'HellLetLoose',
        'ReadyOrNotGame',
        'paydaytheheist',
        'DeepRockGalactic',
        'killingfloor',
        'l4d2',
        'stalker',
        'insurgency',
        'joinsquad',
        'arma',
        'BattleBitRemastered',
        'DeltaForceGlobal',
        'Planetside',
        // Football video games
        'EASportsFC',
        'EAFC',
        'fut',
        'FIFA',
        'FifaCareers',
        'FUTMobile',
        'footballmanagergames',
        'footballmanager',
        'eFootball',
        'WEPES',
        'pesmobile',
        'UFLTheGame',
        'FantasyPL',
        // Football clubs
        'reddevils',
        'Gunners',
        'LiverpoolFC',
        'chelseafc',
        'coys',
        'MCFC',
        'NUFC',
        'avfc',
        'Hammers',
        'Everton',
        'lcfc',
        'LeedsUnited',
        'nffc',
        'WWFC',
        'crystalpalace',
        'BrightonHoveAlbion',
        'realmadrid',
        'Barca',
        'atletico',
        'ACMilan',
        'Juve',
        'FCInterMilan',
        'ASRoma',
        'sscnapoli',
        'fcbayern',
        'borussiadortmund',
        'psg',
        'Olympique*',
        'ASMonaco',
        'RCLens',
        'ASSE',
        'LOSC',
        'FCNantes',
        'staderennais',
        'benfica',
        'fcporto',
        'SportingCP',
        'AjaxAmsterdam',
        'CelticFC',
        'rangersfc',
        'InterMiami',
        // Automation / factory games
        '*factorio*',
        'satisfactory*',
        'Dyson_Sphere_Program',
        'shapez*',
        'Mindustry',
        'CaptainOfIndustry',
        'Techtonica',
        'FoundryGame',
        'Oxygennotincluded',
        'Zachtronics',
        'opus_magnum',
        'infinifactory',
        'Autonauts',
        'AutomationGames',
        // Warhammer
        '*warhammer*',
        '*40k*',
        '*HorusHeresy*',
        'Grimdank',
        'ageofsigmar',
        'Sigmarxism',
        'killteam',
        'Necromunda',
        'bloodbowl',
        'spacemarine*',
        'Ultramarines',
        'BloodAngels',
        'theunforgiven',
        'SpaceWolves',
        'BlackTemplars',
        'Greyknights',
        'AdeptusCustodes',
        'AdeptusMechanicus',
        'TheAstraMilitarum',
        'sistersofbattle',
        'ImperialKnights',
        'Tyranids',
        'Necrontyr',
        'orks',
        'Eldar',
        'Drukhari',
        'LeaguesofVotann',
        'ThousandSons',
        'EmperorsChildren',
        'DarkTide',
        'Vermintide',
        'RogueTraderCRPG',
        'dawnofwar',
    ];

    const hiddenAttribute = 'data-rr-hidden';
    const translationCookieName = 'reddit_translation_status';
    const navigationGuardKey = 'rr-automatic-navigations';

    // Every element that represents one post in a listing.
    const postSelector = [
        'shreddit-post',                 // New Reddit: feeds
        '[data-testid$="post-unit"]',    // New Reddit: search results
        '.thing.link[data-subreddit]',   // Old Reddit: listings
        '.search-result-link',           // Old Reddit: search results
    ].join(',');

    const oMessages = {
        en: {
            menuSettings: 'Settings…',
            listLabel: 'Hidden subreddits',
            listHelp: 'One per line. “r/name”, a full URL or a bare name all work. '
                + '* is a wildcard (e.g. *f1*). Posts stay visible when you browse the subreddit itself.',
            translation: 'Disable automatic translation',
            reset: 'Restore defaults',
            cancel: 'Cancel',
            save: 'Save',
        },
        fr: {
            menuSettings: 'Paramètres…',
            listLabel: 'Subreddits masqués',
            listHelp: 'Un par ligne. « r/nom », une URL complète ou le nom seul fonctionnent. '
                + '* est un joker (ex. *f1*). Les posts restent visibles quand on consulte le subreddit lui-même.',
            translation: 'Désactiver la traduction automatique',
            reset: 'Rétablir les valeurs par défaut',
            cancel: 'Annuler',
            save: 'Enregistrer',
        },
    };
    const oText = navigator.language.toLowerCase().startsWith('fr') ? oMessages.fr : oMessages.en;

    // ---------------------------------------------------------------------
    // State
    // ---------------------------------------------------------------------

    let aSubreddits = loadSubreddits();
    let oMatcher = buildMatcher(aSubreddits);
    let bBlockTranslation = GM_getValue('blockTranslation', true) !== false;
    let currentSubreddit = getCurrentSubreddit();
    let lastHref = location.href;
    let bScanScheduled = false;

    // Post element -> subreddit name, so each post is only resolved once.
    const oSubredditCache = new WeakMap();

    // ---------------------------------------------------------------------
    // Subreddit list
    // ---------------------------------------------------------------------

    /**
     * Turns free text (names, "r/name", URLs, separated by whitespace, commas
     * or semicolons) into a clean, de-duplicated list of patterns.
     */
    function parseSubredditList(text) {
        const oSeen = new Set();
        const aResult = [];

        for (const entry of text.split(/[\s,;]+/)) {
            const name = entry
                .replace(/^https?:\/\/[^/]+/i, '')
                .replace(/^\/?r\//i, '')
                .replace(/[/?#].*$/, '');

            if (!/^[a-z0-9_*]+$/i.test(name) || /^\*+$/.test(name) || oSeen.has(name.toLowerCase())) {
                continue;
            }

            oSeen.add(name.toLowerCase());
            aResult.push(name);
        }

        return aResult;
    }

    /**
     * Returns the saved list, or the defaults when nothing has been saved yet.
     * Defaults that did not exist when the list was last saved are appended, so
     * script updates bring new entries without restoring the ones the user removed.
     */
    function loadSubreddits() {
        const aStored = GM_getValue('subreddits', null);

        if (!Array.isArray(aStored)) {
            return parseSubredditList(aDefaultSubreddits.join('\n'));
        }

        const aKnownDefaults = GM_getValue('knownDefaults', null);
        const oKnown = new Set((Array.isArray(aKnownDefaults) ? aKnownDefaults : []).map((name) => name.toLowerCase()));
        const aNewDefaults = aDefaultSubreddits.filter((name) => !oKnown.has(name.toLowerCase()));
        const aMerged = parseSubredditList([...aStored, ...aNewDefaults].join('\n'));

        if (aNewDefaults.length > 0) {
            GM_setValue('subreddits', aMerged);
            GM_setValue('knownDefaults', aDefaultSubreddits);
        }

        return aMerged;
    }

    /**
     * Compiles the list into a single regular expression. Entries only contain
     * [a-z0-9_*] (see parseSubredditList), so no escaping is required.
     */
    function buildMatcher(aList) {
        if (aList.length === 0) {
            return null;
        }

        const aSources = aList.map((pattern) => pattern.replaceAll('*', '[a-z0-9_]*'));

        return new RegExp(`^(?:${aSources.join('|')})$`, 'i');
    }

    // ---------------------------------------------------------------------
    // Hiding posts
    // ---------------------------------------------------------------------

    function getCurrentSubreddit() {
        return location.pathname.match(/^\/r\/([a-z0-9_]+)/i)?.[1].toLowerCase() ?? '';
    }

    /**
     * Extracts a subreddit name from "name", "r/name" or any path/URL
     * containing "/r/name/". Returns null for anything else (e.g. "u/user").
     */
    function extractSubredditName(value) {
        if (!value) {
            return null;
        }

        return value.match(/(?:^|\/)r\/([a-z0-9_]+)/i)?.[1]
            ?? (/^[a-z0-9_]+$/i.test(value) ? value : null);
    }

    const aSubredditAttributes = ['subreddit-name', 'subreddit-prefixed-name', 'data-subreddit', 'permalink'];

    function resolveSubreddit(oPost) {
        const aValues = aSubredditAttributes
            .map((attribute) => oPost.getAttribute(attribute))
            .filter((value) => value !== null);

        if (aValues.length > 0) {
            // An empty string marks the post as resolved but unmatchable (e.g. a profile post).
            return aValues.map(extractSubredditName).find((name) => name !== null) ?? '';
        }

        // No metadata on the element itself (search results): rely on its first subreddit link.
        return extractSubredditName(oPost.querySelector('a[href*="/r/"]')?.getAttribute('href'));
    }

    function evaluatePost(oPost) {
        let name = oSubredditCache.get(oPost);

        if (name === undefined) {
            name = resolveSubreddit(oPost);

            if (name === null) {
                // Not resolvable yet (element still being parsed): retry on the next scan.
                return;
            }

            oSubredditCache.set(oPost, name);
        }

        // Never hide a subreddit's posts while browsing that subreddit itself.
        const bHide = oMatcher !== null
            && name.toLowerCase() !== currentSubreddit
            && oMatcher.test(name);

        // New Reddit wraps each feed post in an <article> followed by a separator.
        const oContainer = oPost.parentElement?.tagName === 'ARTICLE' ? oPost.parentElement : oPost;

        oContainer.toggleAttribute(hiddenAttribute, bHide);
    }

    function scan() {
        bScanScheduled = false;
        handleLocationChange();

        for (const oPost of document.querySelectorAll(postSelector)) {
            evaluatePost(oPost);
        }
    }

    // requestAnimationFrame runs before the next paint, so posts never flash.
    function scheduleScan() {
        if (!bScanScheduled) {
            bScanScheduled = true;
            requestAnimationFrame(scan);
        }
    }

    // Reddit is a single-page application: the URL changes without a page load.
    function handleLocationChange() {
        if (location.href === lastHref) {
            return;
        }

        lastHref = location.href;
        currentSubreddit = getCurrentSubreddit();

        if (bBlockTranslation) {
            redirectWithoutTranslationParam();
        }
    }

    // ---------------------------------------------------------------------
    // Automatic translation
    // ---------------------------------------------------------------------

    /**
     * Safety net against redirect/reload loops: allows at most three automatic
     * navigations per 15 seconds and per tab.
     */
    function allowAutomaticNavigation() {
        try {
            const now = Date.now();
            const aRecent = JSON.parse(sessionStorage.getItem(navigationGuardKey) ?? '[]')
                .filter((timestamp) => now - timestamp < 15000);

            if (aRecent.length >= 3) {
                return false;
            }

            aRecent.push(now);
            sessionStorage.setItem(navigationGuardKey, JSON.stringify(aRecent));

            return true;
        } catch {
            // Without storage there is no way to detect a loop: stay put.
            return false;
        }
    }

    /**
     * Returns the URL without its "tl" (translation language) parameter, or
     * null when there is nothing to remove.
     */
    function stripTranslationParam(href) {
        let oUrl;

        try {
            oUrl = new URL(href, location.href);
        } catch {
            return null;
        }

        if (!oUrl.searchParams.has('tl')) {
            return null;
        }

        oUrl.searchParams.delete('tl');

        return oUrl.href;
    }

    function redirectWithoutTranslationParam() {
        const cleanHref = stripTranslationParam(location.href);

        if (cleanHref === null || !allowAutomaticNavigation()) {
            return false;
        }

        location.replace(cleanHref);

        return true;
    }

    function readTranslationStatus() {
        const oMatch = document.cookie.match(new RegExp(`(?:^|;\\s*)${translationCookieName}=([^;]*)`));

        if (!oMatch) {
            return null;
        }

        try {
            return JSON.parse(decodeURIComponent(oMatch[1])) ?? {};
        } catch {
            return {};
        }
    }

    function writeTranslationStatus(oStatus, bHostOnly = false) {
        const domain = !bHostOnly && /(^|\.)reddit\.com$/.test(location.hostname) ? '; domain=.reddit.com' : '';

        document.cookie = `${translationCookieName}=${encodeURIComponent(JSON.stringify(oStatus))}`
            + `; path=/${domain}; max-age=31536000; SameSite=Lax; Secure`;
    }

    /**
     * Forces Reddit's translation preference cookie to "off" and silences the
     * related prompts. Returns true when translation was active beforehand,
     * i.e. when the current page has probably been served translated.
     */
    function disableTranslation() {
        const oStatus = readTranslationStatus();

        if (oStatus?.isTranslationActive === false) {
            return false;
        }

        const oNextStatus = {
            coachmarkDisplayCount: 0,
            ...oStatus,
            shouldDisplayCoachmark: false,
            shouldDisplayFeedbackCoachmark: false,
            showCommentTranslationModal: false,
            showPostTranslationModal: false,
            isTranslationActive: false,
        };

        writeTranslationStatus(oNextStatus);

        // A host-only cookie may shadow the domain-wide one: overwrite it as well.
        if (readTranslationStatus()?.isTranslationActive !== false) {
            writeTranslationStatus(oNextStatus, true);
        }

        return oStatus?.isTranslationActive === true;
    }

    // Removes "tl" from links before they are followed (clicks and middle-clicks).
    function cleanClickedLink(oEvent) {
        if (!bBlockTranslation) {
            return;
        }

        const oLink = oEvent.composedPath().find((oNode) => oNode.tagName === 'A' && oNode.href?.includes('tl='));
        const cleanHref = oLink ? stripTranslationParam(oLink.href) : null;

        if (cleanHref !== null) {
            oLink.href = cleanHref;
        }
    }

    function watchTranslationCookie() {
        const enforce = () => {
            if (bBlockTranslation) {
                disableTranslation();
            }
        };

        if (window.cookieStore?.addEventListener) {
            window.cookieStore.addEventListener('change', (oEvent) => {
                if (oEvent.changed.some((oCookie) => oCookie.name === translationCookieName)) {
                    enforce();
                }
            });
        } else {
            setInterval(enforce, 3000);
        }
    }

    /**
     * Returns true when the page is about to be replaced by an untranslated
     * version, in which case there is no point in initialising anything else.
     */
    function enforceUntranslatedPage() {
        if (redirectWithoutTranslationParam()) {
            return true;
        }

        if (disableTranslation() && allowAutomaticNavigation()) {
            location.reload();

            return true;
        }

        return false;
    }

    // ---------------------------------------------------------------------
    // Settings dialogue
    // ---------------------------------------------------------------------

    function createElement(tagName, oProperties = {}, aChildren = []) {
        const oElement = Object.assign(document.createElement(tagName), oProperties);

        oElement.append(...aChildren);

        return oElement;
    }

    function saveSettings(aNewSubreddits, bNewBlockTranslation) {
        aSubreddits = aNewSubreddits;
        oMatcher = buildMatcher(aSubreddits);
        bBlockTranslation = bNewBlockTranslation;

        GM_setValue('subreddits', aSubreddits);
        GM_setValue('knownDefaults', aDefaultSubreddits);
        GM_setValue('blockTranslation', bBlockTranslation);

        if (bBlockTranslation && enforceUntranslatedPage()) {
            return;
        }

        scan();
    }

    function openSettings() {
        if (!document.body || document.querySelector('dialog.rr-settings')) {
            return;
        }

        const oTextarea = createElement('textarea', { rows: 14, spellcheck: false, value: aSubreddits.join('\n') });
        const oCheckbox = createElement('input', { type: 'checkbox', checked: bBlockTranslation });
        const oResetButton = createElement('button', { type: 'button', textContent: oText.reset });
        const oCancelButton = createElement('button', { type: 'button', textContent: oText.cancel });
        const oSaveButton = createElement('button', { type: 'submit', className: 'rr-primary', textContent: oText.save });

        const oForm = createElement('form', { method: 'dialog' }, [
            createElement('h2', { textContent: 'Readable Reddit' }),
            createElement('label', { className: 'rr-field' }, [
                createElement('span', { textContent: oText.listLabel }),
                oTextarea,
            ]),
            createElement('p', { textContent: oText.listHelp }),
            createElement('label', { className: 'rr-checkbox' }, [
                oCheckbox,
                createElement('span', { textContent: oText.translation }),
            ]),
            createElement('div', { className: 'rr-actions' }, [oResetButton, oCancelButton, oSaveButton]),
        ]);
        const oDialog = createElement('dialog', { className: 'rr-settings' }, [oForm]);

        oResetButton.addEventListener('click', () => {
            oTextarea.value = aDefaultSubreddits.join('\n');
        });
        oCancelButton.addEventListener('click', () => oDialog.close());
        oForm.addEventListener('submit', () => saveSettings(parseSubredditList(oTextarea.value), oCheckbox.checked));
        oDialog.addEventListener('close', () => oDialog.remove());
        // Keep Reddit's keyboard shortcuts quiet while typing in the dialogue.
        oDialog.addEventListener('keydown', (oEvent) => oEvent.stopPropagation());

        document.body.append(oDialog);
        oDialog.showModal();
    }

    const styles = `
        [${hiddenAttribute}],
        [${hiddenAttribute}] + hr,
        search-telemetry-tracker:has(> [${hiddenAttribute}]) + hr {
            display: none !important;
        }

        dialog.rr-settings {
            box-sizing: border-box;
            width: min(30rem, calc(100vw - 2rem));
            padding: 1.25rem;
            border: 1px solid #8884;
            border-radius: 0.75rem;
            background: #fff;
            color: #1a1a1b;
            font: 14px/1.4 system-ui, sans-serif;
            color-scheme: light dark;
        }
        dialog.rr-settings::backdrop { background: #0009; }
        dialog.rr-settings * { box-sizing: border-box; font: inherit; color: inherit; }
        dialog.rr-settings h2 { margin: 0 0 1rem; font-size: 1.25rem; font-weight: 600; }
        dialog.rr-settings p { margin: 0.375rem 0 1rem; font-size: 0.85em; opacity: 0.75; }
        dialog.rr-settings .rr-field { display: block; }
        dialog.rr-settings .rr-field span { display: block; margin-bottom: 0.375rem; font-weight: 600; }
        dialog.rr-settings textarea {
            display: block;
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #8888;
            border-radius: 0.375rem;
            background: transparent;
            font-family: ui-monospace, monospace;
            resize: vertical;
        }
        dialog.rr-settings .rr-checkbox { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        dialog.rr-settings .rr-checkbox input { width: 1rem; height: 1rem; margin: 0; }
        dialog.rr-settings .rr-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
        dialog.rr-settings .rr-actions button:first-child { margin-right: auto; }
        dialog.rr-settings button {
            padding: 0.375rem 0.875rem;
            border: 1px solid #8888;
            border-radius: 999px;
            background: transparent;
            cursor: pointer;
        }
        dialog.rr-settings button.rr-primary { border-color: #d93900; background: #d93900; color: #fff; }

        @media (prefers-color-scheme: dark) {
            dialog.rr-settings { background: #1a1a1b; color: #e6e6e6; }
        }
    `;

    // ---------------------------------------------------------------------
    // Initialisation
    // ---------------------------------------------------------------------

    if (bBlockTranslation && enforceUntranslatedPage()) {
        return;
    }

    GM_addStyle(styles);
    GM_registerMenuCommand(oText.menuSettings, openSettings);

    // Keep every open Reddit tab in sync when the settings change elsewhere.
    GM_addValueChangeListener('subreddits', (key, oldValue, newValue, bRemote) => {
        if (bRemote) {
            aSubreddits = loadSubreddits();
            oMatcher = buildMatcher(aSubreddits);
            scan();
        }
    });
    GM_addValueChangeListener('blockTranslation', (key, oldValue, newValue, bRemote) => {
        if (bRemote) {
            bBlockTranslation = newValue !== false;
        }
    });

    watchTranslationCookie();
    document.addEventListener('click', cleanClickedLink, true);
    document.addEventListener('auxclick', cleanClickedLink, true);

    // Observing the document itself works from document-start, before <html> exists.
    new MutationObserver(scheduleScan).observe(document, { childList: true, subtree: true });
    scan();
})();

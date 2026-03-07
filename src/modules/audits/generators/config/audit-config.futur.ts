import type { AuditConfigItem } from '../adapters/base.generator';

// TODO: IMPROVE

const config: AuditConfigItem[] = [
  {
    id: 'futur_rfr_changement_regime',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title:
      'Votre RFR dépasse le plafond : vous ne pourrez pas opter pour le versement libératoire',
    summary:
      "Votre revenu fiscal de référence de l'année N-2 dépasse le plafond de {{rfr_threshold}}€ par part fiscale, ce qui vous prive de l'option du versement libératoire de l'impôt sur le revenu. Ce régime simplifié — très apprécié pour sa prévisibilité — intègre le paiement de l'IR directement dans vos cotisations URSSAF à un taux fixe sur le CA. Sans cette option, vous devrez gérer votre IR séparément via le barème progressif et anticiper les régularisations.",
    content: `<b>Pourquoi cette limitation s'applique à votre situation</b><br>
Le versement libératoire est réservé aux foyers dont le revenu fiscal de référence N-2 ne dépasse pas <b>{{rfr_threshold}}€ par part fiscale</b>. Ce seuil s'applique au niveau du foyer fiscal — pas uniquement à vos revenus d'activité. Il est possible qu'une année plus faible en N-2 vous rende éligible à l'avenir.<br>
<br>
<b>Ce que cela implique concrètement</b><br>
Vous devrez déclarer vos revenus d'entrepreneur au barème progressif de l'IR chaque année, en les cumulant à tous vos autres revenus du foyer fiscal. L'abattement forfaitaire s'appliquera automatiquement (34% BNC, 50% BIC services, 71% BIC ventes), mais la charge fiscale finale reste moins prévisible qu'avec le versement libératoire.<br>
<br>
<b>Comment anticiper le paiement de votre IR</b><br>
• Provisionnez chaque mois entre 15% et 35% de votre CA selon votre TMI estimé<br>
• Placez cette réserve sur un livret ou une assurance-vie pour qu'elle travaille en attendant<br>
• Modulez vos acomptes de prélèvement à la source pour éviter une grosse régularisation en fin d'année<br>
• Simulez votre IR prévisionnel dès maintenant avec votre conseiller Timbr<br>
<br>
<b>Bonne nouvelle</b><br>
Si votre RFR diminue dans les prochaines années (changement de situation familiale, revenus en baisse, déductions supplémentaires), vous pourrez réévaluer votre éligibilité au versement libératoire au 1er janvier suivant.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR — Impôts.gouv.fr",
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur — Service-Public.fr",
      },
    ],
  },

  {
    id: 'futur_prelevementliberatoire_eligible',
    category: 'Fiscalité',
    type: 'success',
    priority: 3,
    title:
      'Versement libératoire : vous êtes éligible à ce régime fiscal simplifié',
    summary:
      "Votre revenu fiscal de référence N-2, ramené à votre nombre de parts fiscales, est inférieur au plafond de {{rfr_threshold}}€. Vous pourrez donc opter pour le versement libératoire de l'impôt sur le revenu dès votre lancement en micro-entreprise — un régime qui simplifie radicalement votre fiscalité en intégrant l'IR directement dans vos cotisations URSSAF à un taux fixe sur votre CA.",
    content: `<b>Ce que le versement libératoire change concrètement</b><br>
Au lieu de déclarer vos revenus d'entrepreneur au barème progressif de l'IR en fin d'année, vous payez votre impôt en même temps que vos cotisations URSSAF, à chaque déclaration de CA. Le taux est fixe et calculé sur votre chiffre d'affaires brut :<br>
• <b>1%</b> pour les ventes de marchandises (BIC achat-revente)<br>
• <b>1,7%</b> pour les prestations de services commerciales (BIC services)<br>
• <b>2,2%</b> pour les professions libérales (BNC)<br>
<br>
<b>À partir de ~40 000€ de CA, le versement libératoire est presque systématiquement un avantage</b><br>
À ce niveau de CA, vous entrez dans la tranche à 11% (voire 30%) et l'écart avec le barème progressif devient significatif. Exemple concret pour un CA de <b>40 000€ en BNC</b> :<br>
• Barème progressif : 40 000€ × 66% (abattement 34%) = 26 400€ imposables → IR ≈ 1 760€ à 11%<br>
• Versement libératoire : 40 000€ × 2,2% = <b>880€</b><br>
→ Économie : environ <b>880€/an</b> à TMI 11%, et bien plus si vous montez en tranche (30% → économie ~6 000€).<br>
Pour BIC services (CA 40k€) : VL à 1,7% = 680€ vs barème à 11% ≈ 2 200€ → économie ~1 500€.<br>
En dessous de 40 000€ de CA ou si vous n'avez aucun autre revenu, vérifiez avec votre conseiller Timbr si le versement libératoire reste avantageux — il peut l'être dès le premier euro facturé.<br>
<br>
<b>Avantages clés</b><br>
• Trésorerie prévisible : vous savez exactement ce que vous payez à chaque déclaration<br>
• Pas de régularisation de fin d'année : l'IR est soldé au fil de l'eau<br>
• Aucune gestion séparée de votre impôt sur le revenu pour vos revenus micro<br>
<br>
<b>La condition d'éligibilité — ce que vous devez vérifier</b><br>
Le seuil est calculé ainsi : <b>RFR N-2 ÷ nombre de parts fiscales ≤ {{rfr_threshold}}€</b>.<br>
Le RFR (revenu fiscal de référence) figure sur votre dernier avis d'imposition, case «Revenu fiscal de référence». Le nombre de parts est aussi indiqué sur ce même document.<br>
<br>
<b>Comment activer l'option</b><br>
L'option doit être exercée avant le <b>30 septembre</b> pour s'appliquer au 1er janvier de l'année suivante, ou lors de votre immatriculation si vous démarrez en cours d'année. Elle se fait depuis votre espace sur autoentrepreneur.urssaf.fr.<br>
<br>
<b>Attention</b><br>
Si votre RFR dépasse le plafond dans les années suivantes, vous perdez automatiquement le bénéfice du versement libératoire au 1er janvier suivant.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR — Impôts.gouv.fr",
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur — Service-Public.fr",
      },
    ],
  },

  {
    id: 'futur_optimisation_arebasee',
    category: 'ARE',
    type: 'success',
    priority: 1,
    title:
      'ARE ou ARCE : choisissez la meilleure option avant de quitter votre emploi',
    summary:
      "En tant que futur créateur d'entreprise issu du salariat, vous pouvez bénéficier des allocations chômage lors de votre lancement — une aide qui peut représenter plusieurs milliers d'euros par mois selon votre salaire actuel. Le choix entre l'ARE mensuelle (maintien progressif) et l'ARCE (capital immédiat à 60%) est l'une des décisions financières les plus importantes de votre lancement. Ce choix est définitif et doit impérativement être fait avant votre départ.",
    content: `Imaginons <b>Thomas, ex-salarié à 3 000€ net/mois</b>, avec <b>24 mois de droits ARE</b> à environ 2 100€/mois. Il a deux options au moment de créer son activité.<br>
<br>
<b>Option 1 — ARE : le filet de sécurité mensuel</b><br>
Thomas continue de percevoir son ARE chaque mois, mais réduite en fonction de ses revenus d'entrepreneur. Tant qu'il gagne moins que son ancien salaire, il touche une partie des deux. Mieux encore : les mois où son activité génère beaucoup, son ARE baisse — mais ses <b>droits ne sont pas consommés</b>. Ils s'allongent dans le temps.<br>
Exemple : Thomas gagne 2 500€ de CA en mars. Son ARE est réduite à environ 600€ ce mois-là, mais il n'a «consommé» qu'une fraction de son mois de droits. Il lui en reste plus pour les mois suivants.<br>
→ <b>Idéal si</b> : son activité démarre lentement, ses revenus sont irréguliers, et il a besoin d'un revenu plancher stable pour couvrir ses charges fixes (loyer, mutuelle, famille).<br>
<br>
<b>Option 2 — ARCE : le capital immédiat</b><br>
Thomas reçoit 60% de la valeur totale de ses droits en deux fois : la moitié au démarrage, la moitié 6 mois plus tard.<br>
Calcul : 2 100€ × 24 mois = 50 400€ de droits totaux → ARCE = <b>30 240€</b> (15 120€ à la création + 15 120€ à 6 mois).<br>
Il n'a plus d'ARE mensuelle, mais dispose d'un capital pour investir : matériel, stock, recrutement, communication, local.<br>
→ <b>Idéal si</b> : il a des besoins en capital importants dès le départ, est confiant sur le décollage rapide de son activité (6-12 mois pour générer un revenu suffisant), et n'a pas besoin d'un revenu mensuel garanti.<br>
<br>
<b>Le vrai avantage caché de l'ARE : la suspension des droits</b><br>
Quand vos revenus d'activité dépassent votre ancien salaire, l'ARE tombe à zéro — mais vos droits <b>restants sont conservés</b> et reprennent si votre activité ralentit ou s'arrête. Avec l'ARCE, une fois l'argent pris, il n'y a pas de retour possible en cas d'échec.<br>
<br>
<b>À retenir absolument</b><br>
• Le choix ARE vs ARCE est <b>définitif et irrévocable</b> une fois effectué<br>
• Inscrivez-vous à France Travail <b>avant ou le jour même de votre fin de contrat</b> — un seul jour de retard entraîne la perte définitive de vos droits pour cette période<br>
• L'ARCE est imposable à l'IR l'année de perception — intégrez-le dans votre calcul fiscal<br>
• Votre conseiller Timbr peut simuler les deux scénarios avec vos chiffres réels`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'futur_choix_structure',
    category: 'Simulation',
    type: 'information',
    priority: 1,
    title: 'Micro, SASU ou EURL : quelle structure pour votre lancement ?',
    summary:
      "Le choix de votre structure juridique est la décision la plus structurante de votre création d'entreprise — elle détermine votre niveau de charges sociales, votre protection personnelle, votre fiscalité et votre capacité à optimiser vos revenus à terme. Une mauvaise structure peut vous coûter plusieurs milliers d'euros par an ou vous priver de protections importantes en cas d'arrêt. Prenez le temps d'analyser chaque option avant de vous immatriculer.",
    content: `<b>Option 1 — Micro-entreprise</b><br>
Idéale pour tester votre activité rapidement. Création en ligne en 10 minutes, comptabilité ultra-simplifiée (livre des recettes uniquement), cotisations sociales proportionnelles au CA réel (12,3% BIC services, 21,2% BNC, 6,2% ventes).<br>
Limites : plafond de CA (77 700€ services / 188 700€ ventes) possible de dépasser deux années consécutives, impossible de déduire vos frais réels, pas d'optimisation salaire/dividendes possible.<br>
<br>
<b>Option 2 — SASU (Société par Actions Simplifiée Unipersonnelle)</b><br>
Vous êtes assimilé-salarié avec une protection sociale équivalente à un cadre (santé, retraite, prévoyance). Vos charges sociales ne portent que sur le salaire que vous vous versez — vous pouvez optimiser en combinant un salaire raisonnable et des dividendes à flat tax 30%.<br>
Limites : comptabilité obligatoire (coût comptable entre 1 500€ et 4 000€/an), charges élevées si salaire significatif.<br>
<br>
<b>Option 3 — EURL (Entreprise Unipersonnelle à Responsabilité Limitée)</b><br>
Gérant TNS (Travailleur Non Salarié), charges sociales plus faibles qu'en SASU (~44% du net vs ~75%), mais protection sociale moindre (pas d'assurance chômage, retraite plus limitée). Bon compromis pour déduire vos frais réels tout en maîtrisant vos charges.<br>
<br>
<b>Guide de décision rapide</b><br>
• CA prévisionnel < 30 000€ → Micro-entreprise<br>
• CA prévisionnel 30 000€ à 80 000€ → Micro ou EURL selon frais et besoin de protection<br>
• CA prévisionnel > 80 000€ → SASU ou EURL quasi systématiquement plus avantageux<br>
<br>
Votre conseiller Timbr peut vous réaliser une simulation comparative personnalisée.`,
    sources: [
      {
        url: 'https://bpifrance-creation.fr/encyclopedie/structures-juridiques/choix-du-statut-generalites/criteres-choix-structure-juridique',
        title: 'Critères de choix de structure juridique — BPI France Création',
      },
      {
        url: 'https://www.shine.fr/blog/sasu-sarl/',
        title: 'SASU vs SARL — Shine',
      },
      {
        url: 'https://www.legalstart.fr/fiches-pratiques/statut-entreprise/sasu-ou-sarl/',
        title: 'SASU ou SARL — Legalstart',
      },
    ],
  },

  {
    id: 'futur_acre_eligibilite',
    category: 'TNS',
    type: 'success',
    priority: 2,
    title: 'ACRE : réduisez de 50% vos charges sociales dès votre lancement',
    summary:
      "L'ACRE (Aide à la Création ou Reprise d'Entreprise) est l'un des dispositifs les plus avantageux pour les nouveaux créateurs : elle réduit vos cotisations sociales de 50% pendant les 12 premiers mois d'activité. En micro-entreprise, cette réduction est automatique à l'immatriculation. En société, elle doit être demandée dans un délai strict de 45 jours — un délai non prolongeable qui coûte cher si on le rate.",
    content: `<b>Ce qu'apporte l'ACRE concrètement</b><br>
L'ACRE réduit de 50% toutes vos cotisations sociales pendant les 12 premiers mois d'activité à compter de votre date d'immatriculation.<br>
<br>
<b>Taux de cotisations avec l'ACRE (vs taux normal)</b><br>
• BIC ventes : 3,1% (vs 6,2%)<br>
• BIC services : 6,15% (vs 12,3%)<br>
• BNC (professions libérales) : 10,6% (vs 21,2%)<br>
<br>
<b>Exemple d'économie</b><br>
Pour un CA de 50 000€ en BNC : cotisations normales ≈ 10 600€ / avec ACRE ≈ 5 300€ → vous économisez <b>5 300€ dès la première année</b>. Une économie à mettre directement en trésorerie.<br>
<br>
<b>Conditions d'éligibilité</b><br>
• Ne pas avoir bénéficié de l'ACRE dans les 3 années précédentes<br>
• Ne pas être gérant ou associé majoritaire d'une société au moment de la création<br>
• Remplir au moins un des critères Pôle Emploi (demandeur d'emploi, salarié licencié, bénéficiaire RSA, etc.)<br>
<br>
<b>Comment en bénéficier selon votre structure</b><br>
• <b>Micro-entreprise</b> : automatique lors de votre immatriculation — aucune démarche supplémentaire<br>
• <b>SASU / EURL</b> : formulaire ACRE à soumettre à l'URSSAF dans les <b>45 jours suivant l'immatriculation</b> — ce délai est impératif et non prolongeable<br>
<br>
<b>Après l'ACRE</b><br>
À partir du 13ème mois, vos cotisations reprennent leur taux normal. Intégrez cette hausse dans votre plan de trésorerie dès maintenant.`,
    sources: [
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur — URSSAF",
      },
    ],
  },

  {
    id: 'futur_tva_franchise_explication',
    category: 'TVA',
    type: 'information',
    priority: 3,
    title: 'TVA : ce que vous devez comprendre avant votre premier client',
    summary:
      "La franchise en base de TVA vous permet de facturer sans TVA si votre CA reste sous {{tva_seuil_base}}€. Simple au démarrage — mais il y a une règle de basculement que beaucoup ignorent, et une raison concrète d'opter pour la TVA dès le début si vous avez des dépenses professionnelles importantes.",
    content: `<b>Le principe : sous {{tva_seuil_base}}€ de CA, pas de TVA</b><br>
En dessous du seuil de franchise, vous facturez sans TVA — pratique et avantageux pour les clients particuliers (B2C). Mention obligatoire sur chaque facture : «TVA non applicable, article 293B du CGI».<br>
<br>
<b>Votre CA estimé : {{ca_estime}}€ — les deux seuils à retenir</b><br>
• Sous <b>{{tva_seuil_base}}€</b> : franchise toute l'année<br>
• Entre {{tva_seuil_base}}€ et <b>{{tva_seuil_majore}}€</b> : vous dépassez le seuil de base mais restez en franchise jusqu'au 31 décembre — TVA obligatoire à partir du 1er janvier suivant<br>
• Au-delà de <b>{{tva_seuil_majore}}€</b> dans l'année : basculement immédiat dès le 1er jour du mois du dépassement<br>
<br>
<b>La règle critique : anticipez le basculement AVANT d'encaisser</b><br>
Si vous avez un devis accepté ou une facture en attente dont le paiement vous ferait dépasser {{tva_seuil_majore}}€, votre prochaine facture doit déjà inclure la TVA — même si la première n'est pas encore payée.<br>
<br>
Exemple : vous avez un premier contrat de 40 000€ signé et en attente de paiement. Vous démarchez un deuxième client. Ce nouveau devis doit déjà inclure 20% de TVA. Pourquoi ? Dès que le premier encaissement arrive, vous basculez à la TVA à partir du 1er de ce mois. Une facture émise dans ce mois sans TVA est une irrégularité fiscale — même si vous n'aviez pas encore reçu l'argent au moment où vous l'avez envoyée.<br>
<br>
<b>Pourquoi opter pour la TVA dès le départ peut être plus intelligent</b><br>
Si vous prévoyez des dépenses professionnelles importantes au démarrage — ordinateur, téléphone, logiciels, mobilier de bureau — vous ne pouvez récupérer la TVA sur ces achats que si vous êtes vous-même assujetti à la TVA. En franchise, cette TVA est une charge définitive.<br>
<br>
Exemple : achat d'un MacBook Pro à 2 400€ TTC (400€ de TVA). En franchise TVA → 400€ perdus. En étant assujetti → 400€ récupérés intégralement sur votre prochaine déclaration.<br>
<br>
<b>À retenir</b><br>
• Clientèle B2C et peu de frais pro → restez en franchise, pas de démarche particulière<br>
• Clientèle B2B ou investissements significatifs dès le démarrage → envisagez d'opter pour la TVA dès l'immatriculation (gratuit, via impots.gouv.fr)`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F21746',
        title: 'Franchise en base de TVA — Service-Public.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23569',
        title: 'Déduction de la TVA — Service-Public.fr',
      },
    ],
  },

  {
    id: 'futur_compte_bancaire_pro',
    category: 'Fiscalité',
    type: 'information',
    priority: 4,
    title:
      'Compte bancaire professionnel : séparez vos flux dès le premier jour',
    summary:
      "Dès le lancement de votre activité, disposer d'un compte bancaire dédié est la meilleure pratique pour séparer clairement vos flux professionnels de vos finances personnelles. Pour les sociétés, c'est une obligation légale dès la création. Pour les micro-entrepreneurs, c'est obligatoire après 2 ans de CA supérieur à 10 000€ — mais fortement conseillé dès le premier euro facturé.",
    content: `<b>Pourquoi un compte dédié dès le départ ?</b><br>
• Séparation claire des flux professionnels et personnels → comptabilité simplifiée<br>
• Facilite vos déclarations de CA et réduit le risque en cas de contrôle fiscal<br>
• Accès aux fonctionnalités pro : virements multiples, cartes business, terminaux de paiement<br>
• Image professionnelle renforcée auprès de vos clients (IBAN pro sur les factures)<br>
<br>
<b>Obligations légales</b><br>
• <b>Société (SASU / EURL / SARL)</b> : compte professionnel obligatoire dès l'immatriculation — le capital social y est déposé lors de la création<br>
• <b>Micro-entrepreneur</b> : obligatoire si le CA dépasse 10 000€ pendant 2 années consécutives<br>
<br>
<b>Nos recommandations</b><br>
• <b>Néo-banques pro</b> (Shine, Qonto, Blank, Dougs) : 7€ à 15€/mois, ouverture en ligne rapide, intégration comptable et export factures automatisé<br>
• <b>Banques traditionnelles</b> : offres pro dès 15€/mois, conseiller dédié, accès plus facile aux crédits professionnels et lignes de découvert<br>
• <b>Option gratuite</b> : Nickel Pro, Revolut Business proposent des comptes sans frais mensuels pour les petits volumes<br>
<br>
<b>Documents nécessaires à l'ouverture</b><br>
Pièce d'identité, justificatif de domicile, extrait Kbis ou attestation d'immatriculation, statuts de la société pour les structures en société.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F35991',
        title: 'Compte bancaire professionnel — Service-Public.fr',
      },
    ],
  },

  {
    id: 'futur_abattement_explication',
    category: 'Fiscalité',
    type: 'information',
    priority: 4,
    title:
      "L'abattement forfaitaire : comprendre comment vos revenus seront imposés en micro",
    summary:
      "Si vous choisissez la micro-entreprise et n'optez pas pour le versement libératoire, vos revenus seront soumis au barème progressif de l'impôt sur le revenu. L'administration applique automatiquement un abattement forfaitaire sur votre CA — il remplace la déduction de vos frais réels. Comprendre ce mécanisme est essentiel pour anticiper votre charge fiscale réelle dès le lancement.",
    content: `<b>Comment fonctionne l'abattement en micro-entreprise</b><br>
L'abattement est un pourcentage de réduction automatique appliqué sur votre CA brut. L'administration considère que ce pourcentage couvre forfaitairement l'ensemble de vos charges professionnelles — vous ne pouvez donc pas déduire vos frais réels en plus.<br>
<br>
<b>Les taux selon votre future activité</b><br>
• <b>Achat / revente de marchandises (BIC ventes)</b> : abattement de <b>71%</b> → seuls 29% de votre CA sont imposés<br>
• <b>Prestations de services commerciales (BIC services)</b> : abattement de <b>50%</b> → la moitié de votre CA est imposée<br>
• <b>Professions libérales (BNC)</b> : abattement de <b>34%</b> → 66% de votre CA sont imposés<br>
<br>
<b>Exemple concret</b><br>
Vous prévoyez un CA de 40 000€ en BNC (conseil, freelance IT, formation...) :<br>
• Abattement de 34% : 40 000€ × 34% = 13 600€ déduits automatiquement<br>
• Revenu imposable ajouté à votre déclaration : <b>26 400€</b><br>
• Ce montant est ensuite ajouté à vos autres revenus (et ceux de votre foyer) pour le calcul au barème progressif<br>
<br>
<b>Le piège à connaître avant de se lancer</b><br>
L'abattement est forfaitaire : si vos frais réels dépassent ce pourcentage (matériel, local, véhicule, sous-traitance), vous payez des impôts sur un revenu plus élevé que votre bénéfice réel. C'est un critère important dans le choix entre micro-entreprise et société.<br>
<br>
<b>Barème progressif de l'IR 2026</b><br>
• Jusqu'à 11 497€ : 0%<br>
• De 11 498€ à 29 315€ : 11%<br>
• De 29 316€ à 83 823€ : 30%<br>
• De 83 824€ à 180 294€ : 41%<br>
• Au-delà de 180 294€ : 45%`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur — Service-Public.fr",
      },
    ],
  },
];

export default config;

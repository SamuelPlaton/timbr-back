import type { AuditConfigItem } from '../adapters/base.generator';

const config: AuditConfigItem[] = [
  {
    id: 'social_sas_sasu_micro_entreprise_avertissement',
    category: 'Social',
    type: 'warning',
    priority: 1,
    title: 'Votre CA dépasse le seuil où la SASU devient plus avantageuse',
    summary:
      "Avec un chiffre d'affaires estimé qui dépasse {{threshold}}€, la comparaison entre micro-entreprise et SASU devient financièrement significative. En micro, vos charges sociales portent sur l'intégralité de votre CA même si vous avez des frais professionnels élevés. En SASU, elles ne portent que sur le salaire que vous vous versez, ce qui peut générer une économie substantielle dès maintenant. Une simulation personnalisée s'impose.",
    content: `<b>Pourquoi le calcul change à partir de {{threshold}}€ de CA</b><br>
En micro-entreprise, vous payez vos cotisations sociales sur la totalité de votre CA (12,3% BIC services, 21,2% BNC) même si vous avez des charges professionnelles importantes. Le régime ne tient aucun compte de vos frais réels.<br>
<br>
En SASU, vous ne payez des cotisations sociales que sur le <b>salaire brut que vous vous versez</b>. Le reste du CA peut rester dans la société pour couvrir vos frais, être mis en réserve ou être distribué en dividendes à flat tax 30%.<br>
<br>
<b>Comparaison indicative à {{threshold}}€ de CA (BNC)</b><br>
• Micro-entreprise : cotisations ≈ 16 400€<br>
• SASU avec salaire brut de 36 000€ : cotisations ≈ 27 000€, mais le reste du CA finance vos frais déductibles et votre trésorerie<br>
• Le gain net dépend de vos frais réels — avec 20 000€ de frais professionnels, la SASU devient souvent plus avantageuse<br>
<br>
<b>Autres avantages de la SASU à ce niveau de CA</b><br>
• Protection sociale complète (assimilé-salarié) : meilleure retraite, prévoyance, maladie<br>
• Possibilité de déduire tous vos frais professionnels réels<br>
• Combinaison salaire + dividendes pour optimiser votre revenu net<br>
• Pas de plafond de CA<br>
<br>
Votre conseiller Timbr peut simuler précisément le gain annuel selon votre situation.`,
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
    id: 'social_sas_sasu_protection_sociale',
    category: 'Social',
    type: 'information',
    priority: 3,
    title: "SASU/SAS : votre statut d'assimilé-salarié, un atout majeur",
    summary:
      "En tant que président de SASU ou SAS, vous bénéficiez du statut d'assimilé-salarié, qui vous confère une protection sociale quasi-équivalente à celle d'un cadre du secteur privé. Ce statut est fondamentalement différent du régime TNS des gérants EURL/SARL, et constitue l'un des principaux avantages de la SASU pour ceux qui valorisent la protection. Votre niveau de protection dépend directement du salaire que vous vous versez.",
    content: `<b>Ce que couvre votre statut d'assimilé-salarié en SASU</b><br>
<br>
<b>Assurance maladie-maternité</b><br>
Vous êtes affilié au régime général de la Sécurité Sociale, comme un salarié. Remboursements maladie identiques, droits à congé maternité/paternité, indemnités journalières.<br>
<br>
<b>Retraite de base et complémentaire</b><br>
Vous cotisez à la fois au régime général (retraite de base) et à l'AGIRC-ARRCO (retraite complémentaire cadre), les deux piliers de la retraite des salariés. Chaque trimestre validé requiert un salaire brut trimestriel d'au moins 1 747€.<br>
<br>
<b>Prévoyance (incapacité / invalidité / décès)</b><br>
Des cotisations obligatoires financent une couverture de base. Il est recommandé de souscrire une prévoyance complémentaire pour couvrir la différence entre vos revenus et les indemnités légales en cas d'arrêt prolongé.<br>
<br>
<b>Ce qui est absent</b><br>
Le statut assimilé-salarié ne donne <b>pas droit à l'assurance chômage</b> (ARE). Si vous cessez votre activité, vous ne pouvez pas ouvrir de droits ARE au titre de votre mandat de président. Des droits antérieurs au salariat peuvent en revanche être préservés sous conditions.<br>
<br>
<b>Le coût de cette protection</b><br>
Les cotisations sociales d'un assimilé-salarié représentent environ 75% du salaire brut versé (patronal + salarial). C'est plus élevé que le régime TNS, mais la couverture est significativement supérieure.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36215',
        title: 'Fiscalité de la SASU — Service-Public.fr',
      },
    ],
  },

  {
    id: 'social_rapport_estimation_revenus',
    category: 'Social',
    type: 'information',
    priority: 4,
    title: 'Estimation de vos revenus et charges sociales annuels',
    summary:
      "Avec un salaire mensuel brut de {{monthly_salary}}€, votre revenu brut annuel estimé s'élève à {{estimated_revenue}}€. Ce niveau de rémunération détermine directement le montant de vos cotisations sociales, votre protection sociale et le nombre de trimestres de retraite que vous validez chaque année. Comprendre ces mécanismes vous permet de piloter votre rémunération avec précision.",
    content: `<b>Récapitulatif de votre situation avec un salaire de {{monthly_salary}}€/mois brut</b><br>
<br>
<b>Revenus annuels estimés</b><br>
• Salaire brut annuel : {{estimated_revenue}}€<br>
• Cotisations patronales (≈ 45%) : {{estimated_revenue}} × 0,45 ≈ à calculer par votre comptable<br>
• Salaire net avant IR : ≈ {{estimated_revenue}} × 0,77<br>
<br>
<b>Droits sociaux générés</b><br>
• Assurance maladie complète (régime général)<br>
• Retraite de base + complémentaire AGIRC-ARRCO<br>
• Prévoyance incapacité/invalidité de base<br>
<br>
<b>Trimestres de retraite validés</b><br>
Pour valider 4 trimestres par année, votre salaire brut annuel doit être d'au moins 6 988€ (4 × 1 747€). Avec votre salaire actuel, vérifiez avec votre conseiller Timbr le nombre exact de trimestres validés.<br>
<br>
<b>Optimisation possible</b><br>
Si votre société génère plus de bénéfice que votre salaire, envisagez de combiner salaire + dividendes pour réduire votre charge fiscale globale tout en maintenant vos droits sociaux. Votre conseiller Timbr peut modéliser la répartition optimale.`,
    sources: [
      {
        url: 'https://abby.fr/blog/connaitre-le-taux-de-cotisations-sociales-urssaf-auto-entrepreneur/',
        title: 'Taux de cotisations sociales — Abby',
      },
    ],
  },

  {
    id: 'social_sasu_dividendes',
    category: 'Social',
    type: 'success',
    priority: 2,
    title: 'Dividendes SASU : optimisez votre rémunération avec la flat tax',
    summary:
      "En SASU, vous pouvez distribuer une partie des bénéfices de votre société sous forme de dividendes soumis à la flat tax de 30%, sans cotisations sociales supplémentaires. C'est l'un des leviers d'optimisation les plus puissants disponibles pour les dirigeants de SASU une fois que l'entreprise génère un bénéfice significatif. La combinaison d'un salaire raisonnable et de dividendes permet souvent d'atteindre un revenu net supérieur à un salaire seul.",
    content: `<b>Fonctionnement des dividendes en SASU</b><br>
Après paiement de l'IS (15% jusqu'à 42 500€ de bénéfice, 25% au-delà), le bénéfice net peut être distribué en dividendes. Ces dividendes sont soumis au <b>Prélèvement Forfaitaire Unique (PFU) de 30%</b> :<br>
• 12,8% d'impôt sur le revenu<br>
• 17,2% de prélèvements sociaux (CSG/CRDS)<br>
• <b>Aucune cotisation sociale supplémentaire</b> (avantage exclusif de la SASU vs SARL/EURL)<br>
<br>
<b>Exemple de stratégie optimisée</b><br>
Imaginons une SASU avec 80 000€ de CA et 50 000€ de bénéfice après frais :<br>
• Salaire brut de 24 000€ → cotisations ≈ 18 000€ → salaire net ≈ 18 500€<br>
• Bénéfice restant après salaire et IS : environ 15 000€ distribuables en dividendes<br>
• Dividendes nets après flat tax (30%) : ≈ 10 500€<br>
• Revenu total net : ≈ 29 000€ — avec retraite et protection sociale complètes<br>
<br>
<b>Points de vigilance</b><br>
• Les dividendes nécessitent une décision formelle de l'associé unique (procès-verbal à rédiger)<br>
• Ils ne peuvent être distribués que si le bénéfice distribuable est positif après affectation légale aux réserves (10% du bénéfice jusqu'à 20% du capital)<br>
• L'option pour le barème progressif de l'IR peut être plus avantageuse si votre TMI est inférieur à 30%<br>
<br>
Votre conseiller Timbr peut simuler le mix salaire/dividendes optimal selon votre situation personnelle.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32963',
        title: 'Dividendes SARL/SASU — Service-Public.fr',
      },
    ],
  },

  {
    id: 'retraite_sasu_declaration_arebasee',
    category: 'Retraite',
    type: 'warning',
    priority: 2,
    title: "Droits ARE : vérifiez votre calcul avant d'immatriculer votre SASU",
    summary:
      "Si vous avez des droits ARE ouverts ou à ouvrir (salariat précédent), la date d'immatriculation de votre SASU peut affecter le démarrage et le montant de vos allocations. Une erreur de timing peut vous faire perdre plusieurs mois d'allocation ou réduire vos droits. Il est indispensable de consulter Pôle Emploi avant toute décision pour sécuriser votre plan de financement de lancement.",
    content: `<b>Comment l'ouverture d'une SASU interagit avec vos droits ARE</b><br>
La création d'une société ne suspend pas automatiquement vos droits ARE — vous pouvez continuer à percevoir des allocations sous conditions. Mais la date d'immatriculation et le moment de votre inscription à Pôle Emploi sont déterminants.<br>
<br>
<b>Règles essentielles</b><br>
• Inscrivez-vous à Pôle Emploi <b>avant ou le jour de votre fin de contrat salarié</b> — un seul jour de retard ferme définitivement certains droits<br>
• La création de la SASU après votre inscription vous permet de bénéficier du maintien ARE (AGE) dès le lancement<br>
• Si vous créez la SASU avant de vous inscrire, vous perdez le bénéfice du maintien ARE dès le premier jour d'immatriculation<br>
<br>
<b>Ce que vous devez vérifier</b><br>
• Montant mensuel de vos droits ARE (salaire journalier de référence × taux)<br>
• Durée totale de vos droits restants<br>
• Impact d'un salaire SASU sur le montant mensuel d'ARE perçu (formule de réduction Pôle Emploi)<br>
<br>
<b>Nos recommandations</b><br>
Prenez rendez-vous avec un conseiller Pôle Emploi et votre conseiller Timbr <b>au moins 2 mois avant votre départ</b> pour planifier la séquence optimale : fin de contrat → inscription PE → immatriculation SASU.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'retraite_sasu_explication_trimestres',
    category: 'Retraite',
    type: 'information',
    priority: 3,
    title:
      'Retraite SASU : avec {{monthly_salary}}€/mois, vous validez {{quarters}} trimestre(s) cette année',
    summary:
      "En SASU, vos trimestres de retraite sont déterminés par votre salaire brut mensuel et non par votre chiffre d'affaires. Avec votre salaire actuel de {{monthly_salary}}€ brut par mois, vous validez {{quarters}} trimestre(s) de retraite sur l'année en cours. Chaque trimestre manquant aujourd'hui se traduit par une décote sur votre future pension — comprendre ce mécanisme est essentiel pour piloter votre rémunération.",
    content: `<b>Comment sont calculés vos trimestres de retraite en SASU</b><br>
En tant qu'assimilé-salarié, vous validez un trimestre de retraite pour chaque <b>1 747€ bruts gagnés sur la période du trimestre</b> (SMIC × 150h en 2024). Vous ne pouvez pas valider plus de 4 trimestres par an, quel que soit votre salaire.<br>
<br>
<b>Votre situation actuelle</b><br>
• Salaire mensuel brut : <b>{{monthly_salary}}€</b><br>
• Salaire trimestriel brut : {{monthly_salary}} × 3€<br>
• Trimestres validés cette année : <b>{{quarters}} / 4</b><br>
<br>
<b>Salaires minimums pour valider vos trimestres</b><br>
• 1 trimestre : 1 747€ bruts sur le trimestre (≈ 582€/mois)<br>
• 2 trimestres : 3 494€ bruts sur le semestre (≈ 582€/mois)<br>
• 3 trimestres : 5 241€ bruts sur 9 mois (≈ 582€/mois)<br>
• 4 trimestres : 6 988€ bruts sur l'année (≈ <b>582€/mois minimum</b>)<br>
<br>
<b>Impact à long terme</b><br>
Chaque année complète (4 trimestres) rapproche votre départ à la retraite à taux plein. Une année incomplète crée une décote de 1,25% par trimestre manquant sur votre pension de base.<br>
<br>
Votre conseiller Timbr peut vous aider à ajuster votre salaire pour optimiser vos droits retraite sans sur-cotiser.`,
    sources: [],
  },

  {
    id: 'retraite_validation_membre_ii',
    category: 'Retraite',
    type: 'warning',
    priority: 4,
    title:
      "Statut EI : anticipez l'adhésion pour optimiser vos cotisations retraite",
    summary:
      "Le statut d'Entrepreneur Individuel peut dans certains cas vous permettre de mieux piloter vos cotisations retraite tout en conservant une structure simple. Ce point mérite une attention particulière si vous envisagez une évolution de votre structure juridique dans les prochaines années.",
    content: `<b>Entrepreneurs Individuels et retraite</b><br>
En EI (Entrepreneur Individuel), depuis la réforme de 2022, votre patrimoine professionnel est automatiquement séparé de votre patrimoine personnel. Vos cotisations retraite (base + complémentaire SSI) sont calculées sur votre bénéfice net, avec des taux progressifs.<br>
<br>
<b>Points à vérifier</b><br>
• Vos cotisations minimales retraite SSI s'appliquent même sans bénéfice<br>
• L'option pour l'impôt sur les sociétés (IS) en EI est disponible depuis 2022, ce qui peut modifier votre assiette de cotisations<br>
• Le passage EI → SASU ou EURL reste possible à tout moment<br>
<br>
Consultez votre conseiller Timbr pour analyser la pertinence de ce statut selon votre situation.`,
    sources: [],
  },

  {
    id: 'retraite_validation_prelevements_personnel',
    category: 'Retraite',
    type: 'danger',
    priority: 1,
    title: 'Risque retraite : votre salaire actuel ne valide aucun trimestre',
    summary:
      'Avec un salaire mensuel brut inférieur à {{minimum_salary}}€, votre rémunération actuelle ne suffit pas à valider un seul trimestre de retraite par trimestre civil. Chaque année passée sans trimestres validés crée une lacune définitive dans votre carrière retraite et peut retarder votre départ à taux plein ou réduire le montant de votre pension. Corriger cette situation est possible avec un ajustement modéré de votre salaire.',
    content: `<b>Pourquoi votre salaire actuel est insuffisant</b><br>
Pour valider 1 trimestre de retraite, vous devez percevoir un salaire brut d'au moins <b>1 747€ sur la période du trimestre</b> (SMIC × 150h en 2024). Cela représente environ <b>{{minimum_salary}}€ bruts par mois</b>.<br>
<br>
Avec votre rémunération actuelle, vous ne validez aucun trimestre ce trimestre. Si cette situation perdure toute l'année, vous perdez 4 trimestres — l'équivalent d'une année entière de cotisation retraite.<br>
<br>
<b>Conséquences concrètes à long terme</b><br>
• Chaque trimestre manquant retarde de 3 mois le départ à la retraite à taux plein<br>
• Chaque trimestre manquant génère une décote de 1,25% sur votre pension de base<br>
• Sur 5 ans de sous-cotisation : jusqu'à 10% de moins sur votre retraite mensuelle<br>
<br>
<b>La solution : augmenter votre salaire au minimum vital retraite</b><br>
Un salaire brut mensuel de <b>{{minimum_salary}}€</b> suffit à valider 4 trimestres par an. L'impact sur vos charges sociales est limité : à ce niveau de salaire, les cotisations représentent environ {{minimum_salary}} × 0,75 = à calculer.<br>
<br>
<b>Alternative</b><br>
Si vous ne souhaitez pas augmenter votre salaire (pour optimiser votre IS), envisagez de racheter des trimestres manquants ultérieurement — une option coûteuse mais disponible.`,
    sources: [],
  },

  {
    id: 'demission_are_chomage',
    category: 'Démission',
    type: 'success',
    priority: 2,
    title:
      'Démission légitime : vous pourriez avoir droit aux allocations chômage',
    summary:
      "Depuis la loi Avenir Professionnel de novembre 2018, certaines démissions d'un CDI peuvent ouvrir droit aux allocations chômage (ARE) si elles sont motivées par un projet de création ou reprise d'entreprise. Ce droit n'est pas automatique et nécessite une validation préalable de votre projet par une commission régionale. Ne quittez pas votre emploi avant d'avoir fait valider votre éligibilité — c'est une condition non négociable.",
    content: `<b>Conditions pour bénéficier de l'ARE après démission légitime</b><br>
• Avoir travaillé en CDI chez le même employeur pendant au moins <b>5 ans consécutifs</b><br>
• Démissionner pour créer ou reprendre une entreprise<br>
• Faire valider votre projet par une <b>Commission Paritaire Interprofessionnelle Régionale (CPIR)</b> avant de démissionner<br>
• Vous inscrire à Pôle Emploi dans les 4 mois suivant la validation du projet<br>
<br>
<b>Procédure de validation du projet</b><br>
1. Constituez un dossier décrivant votre projet entrepreneurial (business plan, étude de marché, financements...)<br>
2. Soumettez-le à la CPIR de votre région (via le site cpir.info)<br>
3. La commission rend sa décision dans un délai de 2 mois<br>
4. Si validé : vous pouvez démissionner et ouvrir vos droits ARE<br>
<br>
<b>Montant potentiel</b><br>
Vos droits ARE sont calculés sur votre salaire de référence des 24 derniers mois. Le taux de remplacement va de 57% à 75% du salaire journalier de référence. Pour vous donner un ordre de grandeur, pour un salaire brut de 45 000€/an : droits ARE ≈ 1 800€ à 2 200€/mois.<br>
<br>
<b>Important</b><br>
La démission sans validation CPIR préalable ne donne droit à aucune ARE — aucune exception n'est possible.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'demission_sasu_conseil_versement',
    category: 'Démission',
    type: 'information',
    priority: 2,
    title:
      'SASU : maintenez un salaire minimum pour ne pas perdre vos droits sociaux',
    summary:
      "En SASU, vous êtes entièrement libre de décider de votre niveau de rémunération — y compris de ne pas vous verser de salaire. Cependant, l'absence prolongée de rémunération a des conséquences directes sur votre protection sociale, vos droits retraite et votre couverture maladie. Maintenir un salaire minimum est souvent la décision la plus équilibrée pour préserver vos droits sans sur-impacter votre trésorerie.",
    content: `<b>Ce que vous perdez sans salaire en SASU</b><br>
• <b>Trimestres retraite</b> : aucune cotisation = aucun trimestre validé (minimum 582€/mois pour en valider 4 par an)<br>
• <b>Assurance maladie</b> : maintenue pendant 12 mois après le dernier salaire, puis suspendue<br>
• <b>Prévoyance de base</b> : ne fonctionne que si des cotisations sont versées<br>
• <b>Droit aux IJ (indemnités journalières)</b> en cas d'arrêt maladie : perdu si aucun salaire versé<br>
<br>
<b>Notre recommandation : salaire minimum de 582€/mois brut</b><br>
Ce montant permet de :<br>
• Valider 4 trimestres de retraite par an<br>
• Maintenir votre couverture maladie active en continu<br>
• Conserver vos droits prévoyance de base<br>
• Générer des cotisations sociales limitées (≈ 435€/mois patronal + salarial)<br>
<br>
<b>Si vous êtes encore sous ARE</b><br>
Le versement d'un salaire SASU réduit vos allocations mensuelles proportionnellement. Calculez le seuil en dessous duquel votre salaire SASU n'impacte pas votre ARE — votre conseiller Timbr peut vous aider à trouver ce seuil optimal.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36215',
        title: 'Fiscalité de la SASU — Service-Public.fr',
      },
    ],
  },

  {
    id: 'are_chomage_optimisation_arebasee',
    category: 'ARE',
    type: 'information',
    priority: 1,
    title:
      'ARE ou ARCE : quelle option maximise votre trésorerie de lancement ?',
    summary:
      "Si vous avez des droits ARE, deux options s'offrent à vous lors de la création de votre société : l'ARE mensuelle (maintien progressif des allocations pendant votre activité) ou l'ARCE (versement en capital de 60% de vos droits restants). Ce choix est définitif et peut représenter plusieurs dizaines de milliers d'euros de différence selon votre profil. L'ARE est généralement recommandée pour les lancements progressifs, l'ARCE pour ceux qui ont besoin d'un capital initial.",
    content: `<b>Option 1 — ARE (maintien mensuel)</b><br>
Vos allocations sont maintenues et réduites proportionnellement à vos revenus mensuels de dirigeant. La formule Pôle Emploi est : <b>Allocation mensuelle = droits quotidiens × jours – (revenu mensuel × 70%)</b>.<br>
<br>
Avantages : filet de sécurité mensuel, s'ajuste à vos revenus, protection si l'activité démarre lentement.<br>
Inconvénients : formule complexe, montant variable, nécessite une déclaration mensuelle des revenus à Pôle Emploi.<br>
<br>
<b>Option 2 — ARCE (capital immédiat)</b><br>
Vous percevez <b>60% de vos droits ARE restants</b> en deux versements :<br>
• 50% à la date de création de l'entreprise<br>
• 50% six mois plus tard<br>
<br>
Avantages : apport en trésorerie immédiat, financement matériel ou fonds de roulement, liberté totale d'utilisation.<br>
Inconvénients : imposable à l'IR l'année de perception, définitif, pas de filet de sécurité mensuel.<br>
<br>
<b>Quand choisir l'ARE ?</b><br>
Activité qui monte progressivement, besoin de revenus réguliers, incertitude sur les premiers mois.<br>
<br>
<b>Quand choisir l'ARCE ?</b><br>
Besoin d'investissements initiaux importants, revenus prévisibles dès le lancement, forte confiance dans la trajectoire.<br>
<br>
<b>Important</b><br>
Ce choix est <b>irrévocable</b>. Prenez rendez-vous avec votre conseiller Timbr avant de décider.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'are_chomage_conseil_expert',
    category: 'ARE',
    type: 'success',
    priority: 2,
    title: "SASU et ARE : maîtrisez l'interaction pour maximiser vos revenus",
    summary:
      "En SASU, chaque mois où vous percevez un salaire réduit votre ARE proportionnellement selon une formule Pôle Emploi complexe. À l'inverse, un salaire trop faible en SASU peut ne pas suffire à couvrir vos besoins tout en faisant partiellement disparaître votre ARE. Trouver le bon équilibre entre salaire SASU et maintien ARE est un exercice d'optimisation qui mérite un accompagnement expert.",
    content: `<b>Comment le salaire SASU affecte votre ARE mensuellement</b><br>
La formule Pôle Emploi pour calculer votre ARE mensuelle réduite est :<br>
• ARE journalière brute × nombre de jours du mois – (revenus nets SASU du mois × 70%)<br>
<br>
Exemple : si votre ARE est de 1 800€/mois et que vous vous versez 1 500€ net de salaire SASU :<br>
• ARE réduite = 1 800 – (1 500 × 0,70) = 1 800 – 1 050 = <b>750€ d'ARE maintenue</b><br>
• Revenu total = 1 500€ (salaire net) + 750€ (ARE) = <b>2 250€/mois</b><br>
<br>
<b>Seuil de non-impact</b><br>
Il existe un salaire SASU en dessous duquel votre ARE n'est pas réduite. Ce seuil dépend de votre ARE quotidienne — votre conseiller Timbr peut le calculer précisément pour vous.<br>
<br>
<b>Durée du maintien</b><br>
L'ARE est maintenue tant que vous avez des droits restants ET que vos revenus restent inférieurs à votre ancien salaire de référence. Au-delà, le compteur s'arrête.<br>
<br>
<b>Notre recommandation</b><br>
Faites simuler votre situation par votre conseiller Timbr avant de fixer votre salaire SASU. Un salaire mal calibré peut réduire votre ARE sans compenser la perte.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'age_maintenir_are',
    category: 'AGE',
    type: 'success',
    priority: 2,
    title:
      'AGE : conservez votre ARE pendant le développement de votre société',
    summary:
      "Le dispositif d'Aide à la Gestion de l'Entreprise (AGE) vous permet de continuer à percevoir vos allocations chômage tout en développant votre société. C'est l'un des leviers de trésorerie les plus puissants pour les premières années d'une SASU — il peut vous apporter plusieurs centaines à plusieurs milliers d'euros par mois en complément de votre salaire. La condition est de vous être inscrit à Pôle Emploi avant la date d'immatriculation de votre société.",
    content: `<b>Comment fonctionne l'AGE (maintien ARE)</b><br>
L'AGE n'est pas un dispositif séparé : c'est simplement la possibilité de continuer à percevoir des allocations ARE pendant que vous gérez votre société. Votre ARE mensuelle est réduite proportionnellement à vos revenus de dirigeant, mais elle ne s'arrête pas.<br>
<br>
<b>Conditions impératives</b><br>
• Être inscrit à Pôle Emploi <b>avant ou le jour de la fin de votre contrat salarié</b><br>
• Immatriculer votre société <b>après</b> votre inscription à Pôle Emploi<br>
• Déclarer mensuellement vos revenus de dirigeant à Pôle Emploi<br>
• L'activité créée ne doit pas vous procurer un revenu mensuel supérieur à votre ancien salaire<br>
<br>
<b>Durée du maintien</b><br>
Vous continuez à percevoir l'ARE réduite tant que vous avez des droits restants. La durée totale de vos droits est la même qu'avec une ARE classique — vous n'avez pas choisi l'ARCE.<br>
<br>
<b>Exemple de gain</b><br>
Avec 800€/mois d'ARE maintenue sur 18 mois : <b>14 400€ de trésorerie supplémentaire</b> pour développer votre activité sans puiser dans votre capital social.<br>
<br>
<b>Attention</b><br>
Si vous optez pour l'ARCE (capital immédiat), l'AGE n'est plus disponible. Ces deux dispositifs sont exclusifs l'un de l'autre.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F15252',
        title: 'ARCE vs ARE — Service-Public.fr',
      },
    ],
  },

  {
    id: 'tva_choix_regime_micro',
    category: 'TVA',
    type: 'information',
    priority: 3,
    title: 'Franchise en base de TVA : une option de simplicité à évaluer',
    summary:
      "Votre chiffre d'affaires estimé est sous le seuil de la franchise en base de TVA, ce qui vous donne la possibilité de rester non-assujetti à la TVA. Ce régime simplifie considérablement votre gestion administrative mais présente des inconvénients pour les activités B2B et vous prive de la récupération de la TVA sur vos achats professionnels. Le choix de rester ou non sous ce régime dépend avant tout de votre clientèle cible.",
    content: `<b>Ce que signifie la franchise en base de TVA</b><br>
En dessous de 36 800€ de CA annuel (seuil 2024 pour les services), vous n'avez pas à collecter la TVA sur vos factures. Vous mentionnez simplement «TVA non applicable, article 293B du CGI» sur chaque facture. Vous ne récupérez pas non plus la TVA sur vos achats.<br>
<br>
<b>Avantages du régime franchise</b><br>
• Zéro déclaration TVA à effectuer<br>
• Facturation plus simple (montants HT = TTC)<br>
• Prix potentiellement plus compétitifs pour les clients particuliers (B2C)<br>
<br>
<b>Inconvénients à prendre en compte</b><br>
• Vous ne récupérez pas la TVA sur vos achats professionnels (matériel, logiciels, services...)<br>
• Image moins professionnelle pour les clients B2B qui souhaitent récupérer leur TVA déductible<br>
• Risque de crédibilité réduite auprès des grands groupes et administrations<br>
<br>
<b>Option volontaire</b><br>
Même sous le seuil, vous pouvez opter volontairement pour l'assujettissement à la TVA. C'est souvent judicieux si : votre clientèle est majoritairement B2B, vous avez des achats importants à refacturer en TVA, ou vous souhaitez vous qualifier pour des marchés publics.<br>
<br>
Votre conseiller Timbr peut vous aider à faire le bon choix selon votre profil clients.`,
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
    id: 'tva_risque_credibilite',
    category: 'TVA',
    type: 'warning',
    priority: 2,
    title: 'Sans numéro de TVA, votre crédibilité B2B peut être compromise',
    summary:
      "À partir d'un CA supérieur à 20 000€, travailler sans TVA peut créer des frictions avec certains clients professionnels qui attendent de récupérer leur TVA déductible. Sans TVA déclarée, vous pouvez également paraître moins structuré ou moins professionnel aux yeux des acheteurs B2B, des grands groupes et des donneurs d'ordres publics. Évaluer votre positionnement B2B vs B2C est essentiel pour décider.",
    content: `<b>Pourquoi les clients professionnels préfèrent les fournisseurs assujettis à la TVA</b><br>
Les entreprises assujetties à la TVA récupèrent la TVA sur leurs achats (TVA déductible). Si vous ne facturez pas de TVA, votre client ne peut rien récupérer — ce qui revient à lui faire payer votre prestation plus cher en valeur nette par rapport à un concurrent assujetti.<br>
<br>
<b>Secteurs où l'absence de TVA est particulièrement pénalisante</b><br>
• Services informatiques et ESN<br>
• Conseil et management<br>
• Communication et marketing<br>
• Sous-traitance industrielle<br>
• Prestataires pour grandes entreprises ou collectivités publiques<br>
<br>
<b>Où l'absence de TVA peut être un avantage</b><br>
• Prestations directes aux particuliers (B2C)<br>
• Petits artisans dont la clientèle est locale et non-assujettie<br>
• Activités de formation (exonérées de TVA sous conditions)<br>
<br>
<b>Notre recommandation</b><br>
Si votre CA dépasse 20 000€ et que vous travaillez principalement en B2B, optez volontairement pour l'assujettissement à la TVA. La récupération de TVA sur vos achats compense souvent l'effort administratif supplémentaire.`,
    sources: [
      {
        url: 'https://intracommunautaire-tva.fr/',
        title: 'Numéro de TVA intracommunautaire — Intracommunautaire-TVA.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F21746',
        title: 'Franchise en base de TVA — Service-Public.fr',
      },
    ],
  },

  {
    id: 'tva_sasu_sasu_conseil_expert',
    category: 'TVA',
    type: 'success',
    priority: 3,
    title: 'Régime TVA : choisissez la formule adaptée à votre activité',
    summary:
      "Pour votre SASU, le choix du régime TVA optimal dépend de votre niveau de CA, de la nature de votre activité et de votre profil clients. Trois régimes existent, avec des implications très différentes en termes d'obligations déclaratives et de trésorerie. Un mauvais choix de régime peut entraîner des crédits TVA bloqués ou des acomptes trop importants — prenez le temps de choisir avec un accompagnement expert.",
    content: `<b>Les 3 régimes TVA disponibles pour votre SASU</b><br>
<br>
<b>1. Franchise en base</b><br>
Pas de TVA collectée ni récupérée. Pas de déclaration TVA. Disponible si CA < 36 800€ (services). Simple mais limite la récupération TVA sur vos achats et peut réduire votre attractivité B2B.<br>
<br>
<b>2. Régime réel simplifié</b><br>
Deux déclarations annuelles (CA12 ou CA12E) + acomptes semestriels. Recommandé pour les CA entre 36 800€ et 840 000€ et pour les activités avec peu de variation mensuelle de TVA. Idéal pour les sociétés de conseil, les SaaS et les prestations de services récurrentes.<br>
<br>
<b>3. Régime réel normal</b><br>
Déclaration mensuelle ou trimestrielle (CA3). Obligatoire si CA > 840 000€, ou si vous avez des crédits TVA récurrents à récupérer rapidement. Plus lourd administrativement mais offre la meilleure granularité pour les activités avec de forts achats TVA.<br>
<br>
<b>Cas particuliers à connaître</b><br>
• Activités de formation : possibilité d'exonération TVA si vous détenez un numéro de déclaration d'activité (NDA)<br>
• Exportations et livraisons intracommunautaires : régime spécifique avec TVA à 0% et obligations déclaratives renforcées<br>
<br>
Nos experts-comptables partenaires peuvent analyser votre situation et vous recommander le régime le plus adapté.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/sites/default/files/media/3_Documentation/fiches_focus/declarer_payer_tva.pdf',
        title: 'Déclarer et payer la TVA — Impôts.gouv.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23569',
        title: 'Déduction de la TVA — Service-Public.fr',
      },
    ],
  },

  {
    id: 'societe_frais_deductibles',
    category: 'Fiscalité',
    type: 'success',
    priority: 2,
    title:
      "Frais professionnels déductibles : réduisez votre IS dès aujourd'hui",
    summary:
      "Contrairement à la micro-entreprise, votre société peut déduire l'ensemble de ses frais professionnels réels de son bénéfice avant calcul de l'impôt sur les sociétés. Chaque euro de frais professionnel déductible réduit directement votre IS — soit 15% de réduction pour les bénéfices sous 42 500€, soit 25% au-delà. C'est l'un des leviers d'optimisation les plus puissants et les plus accessibles pour les dirigeants de société.",
    content: `<b>Catégories de frais déductibles à connaître</b><br>
<br>
<b>Véhicule professionnel</b><br>
Deux options : indemnités kilométriques (barème officiel selon motorisation) ou frais réels (carburant, assurance, entretien, amortissement). Le choix dépend de votre kilométrage annuel et du type de véhicule. Tenez à jour un carnet de bord professionnel.<br>
<br>
<b>Téléphone et internet</b><br>
Prorata de l'usage professionnel vs personnel (souvent 50% à 100% selon votre utilisation réelle). Conservez vos factures opérateur.<br>
<br>
<b>Repas et frais de représentation</b><br>
Repas d'affaires avec clients, prospects ou partenaires : entièrement déductibles si justifiés. Restaurant seul : déductible uniquement si votre lieu de travail est éloigné de votre domicile.<br>
<br>
<b>Matériel et équipements</b><br>
Ordinateurs, mobilier, logiciels, équipements professionnels : déductibles par amortissement (sur 3 à 5 ans selon la nature). Les logiciels < 500€ sont déductibles immédiatement.<br>
<br>
<b>Loyer et charges de bureau</b><br>
Si vous louez un bureau ou des locaux : 100% déductibles. Si vous travaillez depuis votre domicile : une quote-part correspondant à la surface professionnelle est déductible.<br>
<br>
<b>Formations et abonnements professionnels</b><br>
Toutes les formations liées à votre activité, abonnements logiciels (SaaS), livres professionnels, cotisations syndicales : entièrement déductibles.<br>
<br>
<b>Conseil pratique</b><br>
Utilisez une carte bancaire professionnelle dédiée pour toutes vos dépenses pro → historique automatique → export comptable simplifié.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36006',
        title: 'Fiscalité de la SAS — Service-Public.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36215',
        title: 'Fiscalité de la SASU — Service-Public.fr',
      },
    ],
  },

  {
    id: 'societe_compte_courant_associe',
    category: 'Fiscalité',
    type: 'information',
    priority: 3,
    title: "Compte courant d'associé : financez votre société intelligemment",
    summary:
      "Le compte courant d'associé (CCA) est un outil de financement interne méconnu qui permet à l'associé de prêter des fonds à sa société de manière souple et fiscalement optimisée. Contrairement à une augmentation de capital, le CCA est remboursable à tout moment et peut générer des intérêts déductibles de l'IS. C'est souvent la première solution à explorer avant de solliciter un crédit bancaire.",
    content: `<b>Qu'est-ce qu'un compte courant d'associé ?</b><br>
Le CCA est une créance de l'associé sur sa société : vous prêtez de l'argent à votre société, qui vous le rembourse quand sa trésorerie le permet. C'est plus souple qu'une augmentation de capital car les fonds peuvent être retirés à tout moment (sauf convention de blocage).<br>
<br>
<b>Avantages fiscaux</b><br>
• Les intérêts versés sur votre CCA sont <b>déductibles de l'IS</b> de la société (dans la limite du taux légal fixé chaque trimestre)<br>
• Ces intérêts sont imposables pour vous à l'IR (ou flat tax 30%) mais constituent un complément de revenu légal<br>
• La flexibilité du CCA permet d'ajuster le financement sans frais de notaire ni modification des statuts<br>
<br>
<b>Limites à respecter</b><br>
• Le taux d'intérêt déductible est plafonné par l'administration (taux légal trimestriel publié au BOFIP)<br>
• Les intérêts au-delà de ce taux ne sont pas déductibles pour la société<br>
• Un CCA trop important par rapport aux capitaux propres peut alerter les banques lors d'une demande de crédit<br>
<br>
<b>Quand l'utiliser ?</b><br>
• Besoin de trésorerie rapide sans délai bancaire<br>
• Avance de frais en attente de remboursement<br>
• Financement d'un investissement en attente de crédit professionnel<br>
• Injection de capital temporaire en attendant une levée de fonds`,
    sources: [
      {
        url: 'https://www.dougs.fr/blog/eurl-is-ou-ir/',
        title: 'EURL : IS ou IR ? — Dougs',
      },
    ],
  },

  {
    id: 'societe_cfe_cotisation',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title:
      "CFE : provisionnez cette taxe annuelle dans votre budget d'exploitation",
    summary:
      "Votre société est redevable de la Cotisation Foncière des Entreprises chaque année à partir de sa deuxième année d'exercice. Contrairement à une micro-entreprise, les montants peuvent être plus élevés pour une société, notamment si votre siège est dans une grande ville. Cette charge est déductible de votre IS mais doit impérativement figurer dans vos provisions mensuelles pour éviter tout problème de trésorerie en fin d'année.",
    content: `<b>Comment est calculée la CFE de votre société</b><br>
La CFE est basée sur la valeur locative des locaux utilisés par votre société (siège social, bureaux, entrepôts). Si votre société est domiciliée chez vous, une base minimale s'applique selon votre commune et votre CA.<br>
<br>
<b>Montants indicatifs selon le CA et la commune</b><br>
• CA < 10 000€ : cotisation minimum entre 227€ et 2 303€ selon la commune<br>
• CA entre 10 000€ et 100 000€ : 227€ à 4 000€ selon la commune<br>
• CA > 100 000€ : cotisation calculée sur la valeur locative réelle des locaux<br>
<br>
<b>Calendrier de paiement</b><br>
• Avis de CFE disponible en octobre-novembre sur impots.gouv.fr<br>
• Paiement dû au <b>15 décembre</b><br>
• Si votre CFE dépasse 3 000€ : acompte obligatoire de 50% au 15 juin<br>
<br>
<b>Optimisation possible</b><br>
• La CFE est intégralement déductible de l'IS de votre société<br>
• En cas de locaux partagés (coworking, pépinière), la CFE peut être allégée<br>
• Certaines zones géographiques (ZFU, ZRR, QPV) offrent des exonérations partielles ou totales — vérifiez votre éligibilité`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23547',
        title: 'Cotisation Foncière des Entreprises — Service-Public.fr',
      },
    ],
  },

  {
    id: 'societe_liasse_fiscale_comptes',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title:
      'Dépôt des comptes annuels : une obligation légale aux sanctions lourdes',
    summary:
      "Toute société commerciale (SASU, SAS, EURL, SARL) est légalement tenue de déposer ses comptes annuels au greffe du Tribunal de Commerce dans les 6 mois suivant la clôture de l'exercice. Cette obligation est souvent négligée par les jeunes entrepreneurs — les sanctions peuvent aller jusqu'à 1 500€ par exercice non déposé et entacher durablement la réputation de votre société auprès des partenaires bancaires et commerciaux.",
    content: `<b>Que devez-vous déposer et quand ?</b><br>
Dans les <b>6 mois suivant la date de clôture</b> de votre exercice comptable, vous devez déposer au greffe du Tribunal de Commerce :<br>
• Le bilan (actif et passif)<br>
• Le compte de résultat<br>
• L'annexe comptable<br>
• Le rapport de gestion (obligatoire pour les SASU/SARL, souvent simplifié)<br>
• Le procès-verbal d'approbation des comptes<br>
<br>
<b>Qui peut effectuer ce dépôt ?</b><br>
Votre expert-comptable prend généralement en charge ce dépôt dans le cadre de sa mission. En l'absence de comptable, vous pouvez le faire directement sur <b>infogreffe.fr</b> ou <b>guichet-entreprises.fr</b> (coût : 50€ à 200€ selon la taille de la société).<br>
<br>
<b>Sanctions en cas de non-dépôt</b><br>
• Amende jusqu'à <b>1 500€ par exercice non déposé</b> (3 000€ si récidive)<br>
• Injonction de dépôt sous astreinte par le juge du tribunal<br>
• Image négative auprès des banques, fournisseurs et clients qui consultent les comptes publics<br>
• Blocage possible de l'ouverture d'un crédit professionnel<br>
<br>
<b>Option confidentialité</b><br>
Les petites sociétés peuvent demander la confidentialité totale ou partielle de leurs comptes (seul le bilan peut être rendu non public). Cette option est gratuite et se demande au moment du dépôt.`,
    sources: [
      {
        url: 'https://www.inpi.fr/decouvrir-inpi/formalites-dentreprises/guichet-unique-formalites-dentreprises-et-registre-national-entreprises',
        title: 'Guichet unique INPI — formalités entreprises',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36215',
        title: 'Fiscalité de la SASU — Service-Public.fr',
      },
    ],
  },

  {
    id: 'societe_optimisation_remuneration',
    category: 'Social',
    type: 'success',
    priority: 2,
    title: 'Optimisation salaire / dividendes : trouvez votre mix idéal',
    summary:
      "En tant que dirigeant de société, vous avez deux leviers pour vous rémunérer — le salaire et les dividendes — dont la combinaison optimale dépend de votre situation fiscale personnelle, du taux d'IS de votre société et de vos besoins en protection sociale. Une mauvaise répartition peut vous coûter plusieurs milliers d'euros d'impôts inutiles chaque année. Cette optimisation est à revoir annuellement avec votre conseiller.",
    content: `<b>Les deux leviers de rémunération en SASU</b><br>
<br>
<b>Salaire brut</b><br>
• Déductible de l'IS de la société (réduit le bénéfice imposable)<br>
• Génère des droits sociaux : retraite, maladie, prévoyance<br>
• Coût total ≈ 175% du net perçu (patronal + salarial)<br>
• Imposable à l'IR avec abattement de 10%<br>
<br>
<b>Dividendes (SASU)</b><br>
• Prélevés sur le bénéfice après IS (15% jusqu'à 42 500€, 25% au-delà)<br>
• Soumis au PFU de 30% (12,8% IR + 17,2% prélèvements sociaux)<br>
• <b>Aucune cotisation sociale supplémentaire en SASU</b><br>
• Ne génèrent pas de droits retraite supplémentaires<br>
<br>
<b>Exemple de comparaison à 60 000€ de bénéfice</b><br>
Scénario A — Tout en salaire : 60 000€ de salaire brut → cotisations ≈ 45 000€ → net ≈ 46 000€ → IR ≈ 6 000€ → net après IR ≈ 40 000€<br>
<br>
Scénario B — Mix 30 000€ salaire + dividendes : salaire net ≈ 23 000€, bénéfice après IS ≈ 20 000€, dividendes nets après flat tax ≈ 14 000€ → total net ≈ 37 000€ mais avec moins de charges IS et plus de trésorerie entreprise<br>
<br>
<b>L'optimisation dépend de votre TMI</b><br>
Si votre TMI est inférieur à 30%, l'option pour le barème progressif sur les dividendes peut être plus avantageuse que la flat tax. Simulez les deux options avec votre conseiller Timbr.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32963',
        title: 'Dividendes SARL/SASU — Service-Public.fr',
      },
      {
        url: 'https://www.dougs.fr/blog/eurl-is-ou-ir/',
        title: 'EURL : IS ou IR ? — Dougs',
      },
    ],
  },

  {
    id: 'societe_per_dirigeant',
    category: 'Retraite',
    type: 'success',
    priority: 3,
    title:
      'PER dirigeant : réduisez votre IR personnel tout en préparant votre retraite',
    summary:
      "En tant que dirigeant salarié de SASU, vos versements sur un Plan d'Épargne Retraite sont déductibles de votre revenu imposable à l'IR jusqu'à 10% de votre rémunération nette (plafonnés à 37 094€ en 2024). À votre niveau de revenu, ce levier peut générer plusieurs milliers d'euros d'économies fiscales annuelles. Pour les gérants TNS (EURL/SARL), le contrat Madelin offre des conditions encore plus avantageuses.",
    content: `<b>Plafonds de déduction PER pour les dirigeants</b><br>
<br>
<b>Dirigeant assimilé-salarié (SASU/SAS)</b><br>
Déduction de vos versements PER dans la limite de :<br>
• 10% de votre rémunération nette imposable de l'année précédente<br>
• Plafond maximum : 8 × PASS = <b>37 094€ en 2024</b><br>
• Plafond minimum (non actif si non salarié) : 10% du PASS = 4 637€<br>
<br>
<b>Gérant TNS (EURL/SARL) — Contrat Madelin</b><br>
Conditions encore plus avantageuses :<br>
• 10% du bénéfice imposable + 15% de la fraction du bénéfice entre 1 et 8 PASS<br>
• Plafond total jusqu'à environ <b>76 000€</b> pour les hauts revenus TNS<br>
<br>
<b>Exemple de gain fiscal concret</b><br>
Vous percevez 60 000€ bruts (assimilé-salarié) → TMI à 30% :<br>
• Versement PER de 6 000€ → réduction d'IR : 6 000 × 30% = <b>1 800€ économisés cette année</b><br>
• Votre effort d'épargne réel est de seulement 4 200€<br>
<br>
<b>Règles importantes</b><br>
• Fonds bloqués jusqu'à la retraite (sauf accidents de la vie)<br>
• Sortie en capital ou en rente à la retraite, imposable à l'IR (taux généralement plus faible)<br>
• Les plafonds non utilisés des 3 années précédentes sont récupérables — consultez votre espace impots.gouv.fr`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/particulier/le-plan-depargne-retraite',
        title: "Plan d'Épargne Retraite — Impôts.gouv.fr",
      },
    ],
  },

  {
    id: 'societe_eurl_sarl_statut_tns',
    category: 'Social',
    type: 'information',
    priority: 3,
    title:
      'Gérant EURL/SARL : votre statut TNS et ses différences avec la SASU',
    summary:
      "En tant que gérant majoritaire d'EURL ou de SARL, vous relevez du statut de Travailleur Non Salarié (TNS) affilié à la Sécurité Sociale des Indépendants. Ce régime est fondamentalement différent du statut d'assimilé-salarié de la SASU — les charges sont plus faibles, mais la protection est moindre sur plusieurs points essentiels. Comprendre ces différences est crucial pour piloter votre rémunération et votre couverture sociale.",
    content: `<b>Le régime TNS en EURL/SARL</b><br>
Le gérant majoritaire cotise à la SSI (Sécurité Sociale des Indépendants) sur la base de sa rémunération nette. Le taux global de cotisations est d'environ <b>44% du net</b> (vs ~75% pour l'assimilé-salarié en SASU) — un avantage considérable en termes de charges immédiates.<br>
<br>
<b>Avantages du régime TNS</b><br>
• Charges sociales significativement inférieures à la SASU à rémunération équivalente<br>
• Possibilité de souscrire un contrat Madelin (retraite, prévoyance, mutuelle) avec des déductions fiscales très avantageuses<br>
• Calcul des cotisations sur N-2 avec régularisation, ce qui peut générer un décalage de trésorerie favorable<br>
<br>
<b>Inconvénients du régime TNS</b><br>
• <b>Pas d'assurance chômage</b> (ARE) : si vous cessez votre activité, aucun droit ouvert au chômage<br>
• Couverture maladie légèrement moins favorable qu'un salarié<br>
• Retraite complémentaire moins généreuse que l'AGIRC-ARRCO des assimilés-salariés<br>
• Cotisations calculées sur N-2 : risque de cotisations élevées si revenus en baisse<br>
<br>
<b>Point spécifique sur les dividendes en SARL</b><br>
Contrairement à la SASU, les dividendes SARL sont soumis à des cotisations sociales TNS si leur montant dépasse <b>10% du capital social + compte courant d'associé</b>. Cet aspect différencie fondamentalement l'optimisation dividendes SARL vs SASU.`,
    sources: [
      {
        url: 'https://www.legalstart.fr/fiches-pratiques/statut-entreprise/sasu-ou-sarl/',
        title: 'SASU ou SARL — Legalstart',
      },
      {
        url: 'https://www.shine.fr/blog/sasu-sarl/',
        title: 'SASU vs SARL — Shine',
      },
    ],
  },
];

export default config;

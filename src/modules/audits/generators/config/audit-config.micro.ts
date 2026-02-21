import type { AuditConfigItem } from '../adapters/base.generator';

const config: AuditConfigItem[] = [
  {
    id: 'tns_tva_liberation_eligible_danger',
    category: 'TNS',
    type: 'danger',
    priority: 2,
    title:
      'Prélèvement libératoire inaccessible : préparez votre IR différemment',
    summary:
      "Votre revenu fiscal de référence de l'année N-2 dépasse le plafond de 27 478€ par part fiscale, ce qui vous exclut du versement libératoire de l'impôt sur le revenu. Ce régime simplifié — qui permet de payer l'IR en même temps que les cotisations URSSAF à taux fixe — ne vous est donc pas accessible. Vous devrez gérer votre IR via le barème progressif, ce qui nécessite une discipline de trésorerie accrue pour éviter les mauvaises surprises en fin d'année.",
    content: `<b>Pourquoi vous n'êtes pas éligible au versement libératoire</b><br>
Le dispositif est réservé aux foyers dont le revenu fiscal de référence N-2 ne dépasse pas <b>27 478€ par part fiscale</b>. Ce seuil prend en compte l'ensemble des revenus du foyer, pas uniquement vos revenus d'activité.<br>
<br>
<b>Ce que ça change pour votre fiscalité</b><br>
Vos revenus de micro-entrepreneur seront intégrés à votre déclaration de revenus annuelle et imposés au barème progressif, après application de l'abattement forfaitaire automatique :<br>
• 34% pour les professions libérales (BNC)<br>
• 50% pour les prestations de services commerciales (BIC)<br>
• 71% pour les ventes de marchandises (BIC)<br>
<br>
<b>Comment anticiper et éviter les régularisations</b><br>
• Provisionnez chaque mois entre 15% et 35% de votre CA selon votre TMI estimé<br>
• Placez cette réserve sur un livret ou une assurance-vie pour qu'elle travaille<br>
• Modulez vos acomptes de prélèvement à la source pour lisser le paiement tout au long de l'année<br>
• Simulez votre IR annuel prévisionnel avec votre conseiller Timbr à chaque trimestre<br>
<br>
<b>Bonne nouvelle</b><br>
Si votre revenu fiscal de référence diminue dans les prochaines années (changement de situation familiale, déductions supplémentaires), vous pourrez réévaluer votre éligibilité au versement libératoire au 1er janvier suivant.`,
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
    id: 'tns_tva_guide_accre',
    category: 'TNS',
    type: 'success',
    priority: 3,
    title:
      "ACRE : vous bénéficiez d'une réduction de 50% sur vos cotisations sociales",
    summary:
      "Votre profil correspond aux critères d'éligibilité à l'ACRE, le dispositif qui réduit de moitié vos cotisations sociales pendant les 12 premiers mois d'activité. En micro-entreprise, cette réduction s'applique automatiquement dès votre immatriculation sans aucune démarche supplémentaire. C'est l'une des aides les plus concrètes pour démarrer votre activité avec une trésorerie allégée.",
    content: `<b>Ce que vous économisez grâce à l'ACRE</b><br>
L'ACRE réduit de <b>50% toutes vos cotisations URSSAF</b> pendant les 12 premiers mois d'activité à compter de votre date d'immatriculation.<br>
<br>
<b>Vos taux de cotisations ACRE vs taux normal</b><br>
• BIC ventes : 3,1% (vs 6,2%)<br>
• BIC services / artisans : 6,15% (vs 12,3%)<br>
• BNC (professions libérales, conseil) : 10,6% (vs 21,2%)<br>
<br>
<b>Exemple de gain concret</b><br>
Pour un CA de 40 000€ en BNC : cotisations normales ≈ 8 480€ — avec ACRE ≈ 4 240€. Vous économisez <b>4 240€ sur votre première année</b>, directement en trésorerie disponible.<br>
<br>
<b>Ce que vous devez anticiper</b><br>
• L'ACRE prend fin précisément au bout de 12 mois — vos cotisations reprennent leur taux normal au 13ème mois<br>
• Provisionnez dès maintenant la différence pour absorber la hausse sans impact sur votre activité<br>
• L'ACRE ne s'applique qu'une seule fois dans une période de 3 ans<br>
<br>
<b>Vérification</b><br>
Confirmez votre bénéfice ACRE en consultant votre espace sur autoentrepreneur.urssaf.fr — votre attestation ACRE doit y apparaître.`,
    sources: [
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur — URSSAF",
      },
    ],
  },

  {
    id: 'fiscalite_prelevements_liberatoires_danger',
    category: 'Fiscalité',
    type: 'danger',
    priority: 2,
    title:
      'Versement libératoire inaccessible : déclarez vos revenus au barème progressif',
    summary:
      "Votre revenu fiscal de référence N-2 dépasse le seuil de 27 478€ par part fiscale, ce qui vous empêche d'opter pour le versement libératoire de l'impôt sur le revenu. Vous ne pouvez donc pas simplifier le paiement de votre IR en l'intégrant à vos déclarations URSSAF. Cette situation nécessite une gestion prévisionnelle rigoureuse pour éviter une régularisation fiscale importante en fin d'année.",
    content: `<b>Impact sur votre fiscalité quotidienne</b><br>
Sans accès au versement libératoire, vos revenus d'entrepreneur s'ajoutent à vos autres revenus du foyer et sont imposés au barème progressif de l'IR. L'abattement forfaitaire de votre régime micro s'applique automatiquement (34% BNC, 50% BIC services, 71% BIC ventes), mais le taux d'imposition final dépend de l'ensemble de vos revenus.<br>
<br>
<b>Stratégie de trésorerie recommandée</b><br>
• Calculez votre TMI estimé en tenant compte de tous vos revenus du foyer<br>
• Provisionnez chaque mois le pourcentage correspondant : 15% (TMI 11%), 25% (TMI 30%), 35% (TMI 41%)<br>
• Utilisez le service de modulation des acomptes de prélèvement à la source sur impots.gouv.fr pour lisser vos paiements<br>
• Réalisez une simulation annuelle de votre IR avec votre conseiller Timbr pour ajuster vos provisions<br>
<br>
<b>Options d'optimisation disponibles</b><br>
• Versements sur un PER (Plan d'Épargne Retraite) déductibles de votre revenu global<br>
• Dons aux associations (réduction d'IR de 66% à 75% du montant)<br>
• Modulation du prélèvement à la source en cas de variation de revenus`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR — Impôts.gouv.fr",
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23267',
        title: 'Impôts et abattements — Service-Public.fr',
      },
    ],
  },

  {
    id: 'fiscalite_prelevements_acces_eligible',
    category: 'Fiscalité',
    type: 'success',
    priority: 3,
    title: 'Versement libératoire : vous êtes éligible à ce régime simplifié',
    summary:
      "Votre revenu fiscal de référence N-2 est inférieur au plafond de 27 478€ par part fiscale, ce qui vous permet d'opter pour le versement libératoire de l'impôt sur le revenu. Ce régime intègre le paiement de votre IR directement dans vos cotisations URSSAF à un taux fixe sur votre chiffre d'affaires. Résultat : plus de mauvaise surprise fiscale en fin d'année et une gestion de trésorerie beaucoup plus prévisible.",
    content: `<b>Comment fonctionne le versement libératoire</b><br>
Vous payez votre IR en même temps que vos cotisations URSSAF, à chaque déclaration de CA (mensuelle ou trimestrielle). Le taux est fixe et calculé sur votre CA brut :<br>
• 1% pour les ventes de marchandises (BIC)<br>
• 1,7% pour les prestations de services commerciales (BIC)<br>
• 2,2% pour les professions libérales (BNC)<br>
<br>
<b>Avantages concrets</b><br>
• Aucune déclaration de revenus IR spécifique à gérer pour vos revenus micro (ils sont déjà libérés)<br>
• Trésorerie prévisible : vous savez exactement ce que vous payez à chaque déclaration<br>
• Pas de régularisation de fin d'année : l'IR est soldé au fil de l'eau<br>
<br>
<b>Comment opter pour ce régime</b><br>
L'option doit être exercée avant le <b>30 septembre</b> pour être applicable au 1er janvier de l'année suivante. Elle se fait depuis votre espace sur autoentrepreneur.urssaf.fr.<br>
<br>
<b>Attention</b><br>
Si votre revenu fiscal de référence dépasse le plafond de 27 478€ par part les années suivantes, vous perdez automatiquement le bénéfice du versement libératoire.`,
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
    id: 'fiscalite_prelevements_calcul_gains',
    category: 'Fiscalité',
    type: 'success',
    priority: 4,
    title: 'Estimation de votre gain annuel grâce au versement libératoire',
    summary:
      "En optant pour le versement libératoire plutôt que le barème progressif de l'IR, vous pourriez économiser environ {{savings}}€ par an sur votre charge fiscale globale. Cette économie dépend de votre tranche marginale d'imposition, de votre chiffre d'affaires et de vos éventuels autres revenus au sein du foyer fiscal. C'est souvent l'un des premiers leviers d'optimisation à activer pour les micro-entrepreneurs.",
    content: `Sur la base de votre situation fiscale actuelle, le versement libératoire vous permettrait d'économiser environ <b>{{savings}}€ par rapport au barème progressif</b>.<br>
<br>
<b>Comment se calcule cette économie</b><br>
Le versement libératoire est avantageux quand votre TMI (taux marginal d'imposition) dépasse le taux du versement libératoire de votre activité :<br>
• BNC : versement libératoire à 2,2% — avantageux dès la tranche à 11%<br>
• BIC services : versement libératoire à 1,7% — avantageux dès la tranche à 11%<br>
• BIC ventes : versement libératoire à 1% — presque toujours avantageux<br>
<br>
<b>Exemple concret</b><br>
Pour un CA de 40 000€ en BNC avec un TMI à 30% et l'abattement de 34% :<br>
• Barème progressif : 40 000€ × 66% × 30% = 7 920€ d'IR<br>
• Versement libératoire : 40 000€ × 2,2% = 880€<br>
• Économie = 7 040€ — une différence considérable<br>
<br>
<b>Important</b><br>
Cette estimation est indicative. Votre conseiller Timbr peut affiner le calcul en intégrant vos autres revenus du foyer, vos déductions disponibles (PER, dons...) et votre situation familiale.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR — Impôts.gouv.fr",
      },
    ],
  },

  {
    id: 'fiscalite_urssaf_declaration',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title: 'Déclarations URSSAF : respectez vos échéances même à CA zéro',
    summary:
      "En tant que micro-entrepreneur, vous êtes tenu de déclarer votre chiffre d'affaires à l'URSSAF à chaque période — mensuelle ou trimestrielle — même si vous n'avez encaissé aucun euro. Tout retard ou oubli entraîne des pénalités automatiques et peut avoir des conséquences sur vos droits sociaux. C'est l'une des obligations les plus fréquemment négligées par les nouveaux entrepreneurs.",
    content: `<b>Vos obligations de déclaration URSSAF</b><br>
Vous devez déclarer votre CA à l'URSSAF selon la fréquence choisie lors de votre immatriculation :<br>
• <b>Mensuelle</b> : déclaration avant le dernier jour de chaque mois<br>
• <b>Trimestrielle (par défaut)</b> : déclaration avant le 30 avril (T1), 31 juillet (T2), 31 octobre (T3) et 31 janvier (T4)<br>
<br>
<b>CA nul : déclarez quand même</b><br>
Si vous n'avez pas encaissé de CA sur la période, vous devez quand même déclarer <b>0€</b>. L'absence de déclaration est considérée comme un oubli et entraîne une pénalité automatique.<br>
<br>
<b>Sanctions en cas de retard ou d'oubli</b><br>
• Pénalité de 1,5% des cotisations dues (minimum 52€ par déclaration manquante)<br>
• En cas de retard répété, l'URSSAF peut déclencher une mise en demeure<br>
• Les cotisations non payées génèrent des intérêts de retard<br>
• Retard dans l'acquisition de vos droits sociaux (maladie, retraite)<br>
<br>
<b>Comment ne plus oublier</b><br>
Paramétrez des rappels automatiques dans votre agenda 5 jours avant chaque échéance. Vous pouvez aussi activer les notifications sur votre espace autoentrepreneur.urssaf.fr.`,
    sources: [
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/toutes-les-fiches-pratiques/determiner-mon-chiffre-daffaires.html',
        title: "Déterminer son chiffre d'affaires — URSSAF Auto-Entrepreneur",
      },
      {
        url: 'https://abby.fr/blog/connaitre-le-taux-de-cotisations-sociales-urssaf-auto-entrepreneur/',
        title: 'Taux de cotisations URSSAF auto-entrepreneur — Abby',
      },
    ],
  },

  {
    id: 'fiscalite_reductions_entreprise_orange',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title:
      "Vos frais réels dépassent probablement l'abattement forfaitaire du régime micro",
    summary:
      "En micro-entreprise, l'administration applique un abattement forfaitaire sur votre CA pour calculer votre revenu imposable — mais cet abattement ne reflète pas forcément vos frais réels. Avec des charges professionnelles estimées à {{professional_expenses}}€, vous pourriez bénéficier d'une meilleure fiscalité en passant à un régime où vos frais sont déductibles réellement. C'est souvent le premier signal pour envisager une transition vers une structure en société.",
    content: `<b>L'abattement forfaitaire en micro-entreprise</b><br>
Le régime micro applique automatiquement un abattement sur votre CA pour estimer vos charges :<br>
• <b>34%</b> pour les professions libérales (BNC)<br>
• <b>50%</b> pour les prestations de services commerciales (BIC)<br>
• <b>71%</b> pour les ventes de marchandises (BIC)<br>
<br>
<b>Le problème avec vos frais réels</b><br>
Avec des frais professionnels estimés à <b>{{professional_expenses}}€</b>, votre taux de charges réel est potentiellement supérieur à l'abattement forfaitaire. En régime micro, vous ne pouvez pas déduire ces frais supplémentaires — vous payez de l'IR et des cotisations sur un revenu fictif plus élevé que votre revenu réel.<br>
<br>
<b>La solution : passer en régime réel (société)</b><br>
En SASU ou EURL, tous vos frais professionnels réels sont déductibles du bénéfice : véhicule, matériel, téléphone, loyer bureau, formations, comptable... Cette déductibilité peut représenter une économie fiscale significative à partir d'environ 30 000€ de CA.<br>
<br>
<b>Notre recommandation</b><br>
Faites réaliser une simulation comparative micro vs société par votre conseiller Timbr pour quantifier précisément le gain potentiel selon votre profil de frais.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23267',
        title: 'Impôts et abattements — Service-Public.fr',
      },
      {
        url: 'https://lamicrobyflo.fr/abattement-forfaitaire-micro-entreprise/',
        title: 'Abattement forfaitaire micro-entreprise — LaMicroByFlo',
      },
      {
        url: 'https://www.l-expert-comptable.com/a/37794-tva-et-auto-entrepreneur.html',
        title: "TVA et déduction de frais — L'Expert-Comptable.com",
      },
    ],
  },

  {
    id: 'fiscalite_plafonds_cotisations',
    category: 'Fiscalité',
    type: 'danger',
    priority: 1,
    title: 'Alerte : votre CA approche du plafond de la micro-entreprise',
    summary:
      "Votre chiffre d'affaires se rapproche dangereusement du plafond annuel de la micro-entreprise, au-delà duquel vous perdrez automatiquement le bénéfice du régime simplifié. Ce dépassement, s'il est constaté deux années consécutives, vous oblige à basculer vers le régime réel avec des obligations comptables et fiscales significativement plus lourdes. Il est temps d'anticiper cette transition pour ne pas la subir.",
    content: `<b>Les plafonds de CA de la micro-entreprise (2024)</b><br>
• <b>77 700€</b> pour les prestations de services (BNC et BIC services)<br>
• <b>188 700€</b> pour les ventes de marchandises (BIC)<br>
<br>
<b>Règle des deux années consécutives</b><br>
Le dépassement du plafond est toléré sur une année. Si votre CA dépasse le seuil deux années consécutives, vous basculez <b>automatiquement au 1er janvier</b> de la troisième année vers le régime réel d'imposition.<br>
<br>
<b>Ce que le régime réel implique</b><br>
• Comptabilité complète obligatoire (bilan, compte de résultat, annexes)<br>
• Recours à un expert-comptable quasi indispensable (1 500€ à 4 000€/an)<br>
• TVA à collecter et déclarer (si vous n'y êtes pas déjà assujetti)<br>
• Déclarations fiscales professionnelles (liasse 2031 pour BNC, etc.)<br>
<br>
<b>Ce que vous devez faire maintenant</b><br>
• Anticipez la transition en rencontrant un expert-comptable dès maintenant<br>
• Comparez la micro-entreprise à la SASU ou EURL pour évaluer la structure la plus avantageuse pour votre niveau de CA<br>
• Votre conseiller Timbr peut vous aider à simuler votre situation dans chaque scénario`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur — Service-Public.fr",
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32353',
        title: 'Passage du régime micro au régime réel — Service-Public.fr',
      },
    ],
  },

  {
    id: 'micro_seuil_tva_franchise',
    category: 'TVA',
    type: 'information',
    priority: 3,
    title:
      'Seuil TVA vs plafond micro : deux chiffres à ne surtout pas confondre',
    summary:
      'Beaucoup de micro-entrepreneurs confondent le seuil de franchise en base de TVA (36 800€ pour les services) avec le plafond de la micro-entreprise (77 700€). Ce sont deux seuils totalement indépendants qui génèrent des obligations distinctes. Dépasser le seuil TVA sans le savoir expose votre entreprise à des redressements fiscaux et peut créer des litiges avec vos clients.',
    content: `<b>Les deux seuils que tout micro-entrepreneur doit connaître</b><br>
<br>
<b>Seuil 1 — Franchise en base de TVA</b><br>
En dessous de ce seuil, vous n'êtes pas assujetti à la TVA : vous ne la collectez pas, ne la récupérez pas et mentionnez «TVA non applicable, article 293B du CGI» sur vos factures.<br>
• Services (BNC / BIC services) : <b>36 800€</b> de CA annuel (seuil de base) / 39 100€ (seuil majoré — dépassement déclenche l'assujettissement immédiat)<br>
• Ventes de marchandises (BIC) : <b>91 900€</b> / 101 000€ (seuil majoré)<br>
<br>
<b>Seuil 2 — Plafond de la micro-entreprise</b><br>
Ce seuil détermine votre droit à rester en régime micro.<br>
• Prestations de services : <b>77 700€</b><br>
• Ventes de marchandises : <b>188 700€</b><br>
<br>
<b>Ce qui peut arriver si vous confondez les deux</b><br>
Vous pouvez être encore en régime micro (CA < 77 700€) mais devoir collecter la TVA (CA > 36 800€). Dans ce cas, vous restez micro-entrepreneur pour vos cotisations et votre IR, mais vous devez facturer la TVA et la déclarer à l'administration.<br>
<br>
<b>Option volontaire</b><br>
Même sous les seuils TVA, vous pouvez choisir d'opter volontairement pour la TVA. C'est souvent conseillé si vous travaillez majoritairement avec des clients professionnels (B2B) qui récupèrent leur TVA déductible.`,
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
    id: 'simulation_micro_entreprise_versements',
    category: 'Simulation',
    type: 'warning',
    priority: 3,
    title:
      'Versement libératoire actif : maîtrisez vos obligations déclaratives',
    summary:
      "Vous avez opté pour le versement libératoire de l'impôt sur le revenu, ce qui signifie que votre IR est payé en même temps que vos cotisations URSSAF à chaque déclaration de CA. Ce régime est avantageux pour sa simplicité et sa prévisibilité, mais il exige une rigueur absolue dans le respect des échéances déclaratives. Tout retard peut entraîner des pénalités fiscales et remettre en cause le bénéfice du dispositif.",
    content: `<b>Votre engagement avec le versement libératoire</b><br>
En optant pour ce régime, vous vous engagez à déclarer et payer votre CA + cotisations + IR à chaque échéance URSSAF. Le taux global incluant l'IR s'élève à :<br>
• BIC ventes : 6,2% + 1% IR = <b>7,2%</b><br>
• BIC services : 12,3% + 1,7% IR = <b>14%</b><br>
• BNC : 21,2% + 2,2% IR = <b>23,4%</b><br>
<br>
<b>Risques à connaître</b><br>
• Un retard de déclaration entraîne une pénalité automatique (1,5% des cotisations dues, min. 52€)<br>
• Si votre revenu fiscal de référence N-2 dépasse 27 478€/part dans les années à venir, vous perdrez l'éligibilité au 1er janvier suivant<br>
• En cas de forte variation de CA, le versement libératoire peut devenir désavantageux<br>
<br>
<b>Vérification annuelle recommandée</b><br>
Chaque automne, comparez votre revenu fiscal de référence au plafond du versement libératoire pour confirmer que vous resterez éligible l'année suivante. Votre conseiller Timbr peut effectuer cette vérification avec vous.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR — Impôts.gouv.fr",
      },
    ],
  },

  {
    id: 'simulation_micro_entreprise_status',
    category: 'Simulation',
    type: 'success',
    priority: 4,
    title:
      'Votre statut micro-entrepreneur est parfaitement adapté à votre activité',
    summary:
      "Votre chiffre d'affaires actuel est bien inférieur aux plafonds de la micro-entreprise, ce qui confirme que ce statut est la structure optimale pour vous aujourd'hui. Vous bénéficiez de la comptabilité la plus allégée du marché, de cotisations strictement proportionnelles à vos encaissements et d'une grande liberté de fonctionnement. Continuez à suivre l'évolution de votre CA pour anticiper sereinement une éventuelle transition.",
    content: `Votre niveau de CA vous permet de profiter pleinement des avantages du régime micro :<br>
<br>
<b>Avantages que vous utilisez</b><br>
• Comptabilité simplifiée : uniquement un livre des recettes et un livre des achats<br>
• Cotisations proportionnelles au CA réel — aucune charge fixe si pas d'encaissement<br>
• Pas de comptable nécessaire (bien qu'un suivi régulier soit conseillé)<br>
• Création, modification et clôture ultra-simplifiées<br>
• Cumul possible avec une activité salariée ou des allocations sous conditions<br>
<br>
<b>Points de vigilance à surveiller</b><br>
• L'approche du plafond de CA (77 700€ services / 188 700€ ventes) sur deux années consécutives entraîne un changement de régime automatique<br>
• L'augmentation de vos frais professionnels réels peut rendre la micro-entreprise fiscalement moins intéressante<br>
• La protection sociale en micro reste limitée comparée à une SASU<br>
<br>
<b>Notre recommandation</b><br>
Effectuez une révision de votre structure au moins une fois par an, notamment si votre CA progresse significativement ou si vos frais professionnels augmentent.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur — Service-Public.fr",
      },
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur — URSSAF",
      },
    ],
  },

  {
    id: 'micro_transition_vers_societe',
    category: 'Simulation',
    type: 'warning',
    priority: 1,
    title: 'Votre CA progresse : est-ce le moment de passer en SASU ou EURL ?',
    summary:
      "Avec un chiffre d'affaires en progression, le passage en société (SASU ou EURL) mérite maintenant une analyse sérieuse. À partir de 50 000€ de CA, les charges en micro-entreprise peuvent dépasser celles d'une SASU, surtout si vous avez des frais professionnels importants. Cette transition, bien anticipée, peut représenter plusieurs milliers d'euros d'économies annuelles et ouvrir des droits sociaux plus protecteurs.",
    content: `<b>Pourquoi la micro-entreprise devient moins avantageuse à partir d'un certain CA</b><br>
En micro-entreprise, vos cotisations sociales sont calculées sur l'intégralité de votre CA, même si vous avez des charges professionnelles importantes. En SASU ou EURL, vous ne payez des charges que sur votre rémunération — le reste peut être conservé en trésorerie dans la société ou distribué en dividendes à moindre fiscalité.<br>
<br>
<b>Comparaison indicative à 60 000€ de CA (BNC)</b><br>
• <b>Micro-entreprise</b> : cotisations sociales ≈ 12 720€ + IR sur revenu imposable<br>
• <b>SASU avec salaire de 25 000€</b> : cotisations totales ≈ 18 750€, mais 35 000€ restent dans la société pour couvrir vos frais ou être distribués en dividendes<br>
• Le gain net dépend fortement de vos frais réels et de votre TMI personnel<br>
<br>
<b>Signaux qui indiquent qu'il faut agir</b><br>
• Vos frais professionnels réels dépassent l'abattement forfaitaire (34% BNC, 50% BIC services)<br>
• Votre CA dépasse régulièrement 50 000€ à 60 000€/an<br>
• Vous approchez du plafond micro (77 700€ services)<br>
• Vous souhaitez une meilleure protection sociale (retraite, maladie, prévoyance)<br>
<br>
<b>Prochaine étape</b><br>
Votre conseiller Timbr peut réaliser une simulation complète micro vs SASU/EURL en intégrant votre CA actuel, vos frais, votre TMI et vos objectifs de revenus.`,
    sources: [
      {
        url: 'https://bpifrance-creation.fr/encyclopedie/structures-juridiques/choix-du-statut-generalites/criteres-choix-structure-juridique',
        title: 'Critères de choix de structure juridique — BPI France Création',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32353',
        title: 'Passage du régime micro au régime réel — Service-Public.fr',
      },
      {
        url: 'https://www.shine.fr/blog/sasu-sarl/',
        title: 'SASU vs SARL — Shine',
      },
    ],
  },

  {
    id: 'micro_retraite_zero_ca_risque',
    category: 'Retraite',
    type: 'danger',
    priority: 2,
    title:
      'Attention : pas de CA déclaré signifie pas de trimestres de retraite',
    summary:
      "En micro-entreprise, vos cotisations retraite sont strictement proportionnelles à votre chiffre d'affaires déclaré — contrairement à un salarié qui valide ses trimestres même en congé maladie ou maternité. Avec un CA insuffisant ou nul, vous risquez de ne valider aucun trimestre de retraite cette année, ce qui impacte directement le montant de votre future pension. Ce mécanisme est l'un des angles morts les plus fréquents chez les micro-entrepreneurs.",
    content: `<b>La règle clé : CA minimum pour valider des trimestres</b><br>
Pour valider un trimestre de retraite, votre CA déclaré sur la période doit générer un revenu cotisé suffisant. Les seuils approximatifs pour valider les <b>4 trimestres annuels</b> sont :<br>
• BNC (professions libérales) : environ <b>5 700€</b> de CA annuel<br>
• BIC services : environ <b>4 600€</b> de CA annuel<br>
• BIC ventes : environ <b>2 600€</b> de CA annuel<br>
<br>
<b>Comparaison avec le salariat</b><br>
Un salarié valide ses trimestres de retraite à partir d'un salaire brut annuel de 1 690€ (150h au SMIC), quelle que soit sa situation (congé maladie, maternité, chômage partiel). En micro-entreprise, il n'y a aucun filet de sécurité : pas de CA = pas de cotisation = pas de trimestre.<br>
<br>
<b>Conséquences à long terme</b><br>
Chaque trimestre manquant réduit le montant de votre future retraite de base et peut décaler l'âge de départ à taux plein. Sur une carrière de 10 ans en micro-entreprise avec de faibles CA, l'impact peut représenter plusieurs dizaines d'euros par mois de retraite en moins.<br>
<br>
<b>Solution</b><br>
Si votre CA est structurellement faible, envisagez une SASU avec un salaire minimum (582€/mois brut) qui permet de valider 4 trimestres par an automatiquement, indépendamment de l'activité réelle.`,
    sources: [
      {
        url: 'https://abby.fr/blog/connaitre-le-taux-de-cotisations-sociales-urssaf-auto-entrepreneur/',
        title: 'Taux de cotisations URSSAF auto-entrepreneur — Abby',
      },
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur — URSSAF",
      },
    ],
  },

  {
    id: 'micro_per_epargne_retraite',
    category: 'Retraite',
    type: 'success',
    priority: 3,
    title:
      'PER : réduisez votre IR maintenant tout en préparant votre retraite',
    summary:
      "Le Plan d'Épargne Retraite est accessible aux micro-entrepreneurs et offre un double avantage : réduire votre impôt sur le revenu de l'année en cours tout en constituant une épargne retraite complémentaire indispensable. Vos versements sont déductibles de votre revenu global imposable, indépendamment de l'abattement forfaitaire de la micro-entreprise. À votre niveau d'imposition, ce levier peut générer plusieurs centaines d'euros d'économies annuelles.",
    content: `<b>Comment fonctionne le PER pour un micro-entrepreneur</b><br>
Les versements volontaires sur un PER sont déductibles de votre revenu global (et non de votre CA micro), dans la limite de :<br>
• <b>10% du PASS de l'année précédente</b>, soit environ 4 637€ en 2024<br>
• Ou 10% de vos revenus professionnels nets si ce montant est plus élevé (plafonné à 37 094€)<br>
<br>
<b>Exemple concret de gain fiscal</b><br>
Si vous êtes dans la tranche à 30% :<br>
• Versement de 3 000€ sur votre PER<br>
• Réduction d'IR : 3 000€ × 30% = <b>900€ économisés cette année</b><br>
• Votre effort d'épargne réel est de seulement 2 100€ après avantage fiscal<br>
<br>
<b>Pourquoi c'est particulièrement pertinent pour vous</b><br>
En micro-entreprise, vos cotisations retraite sont proportionnelles au CA déclaré. En cas de CA faible ou nul, vous cotisez très peu. Le PER compense cette faiblesse structurelle du régime en vous permettant de constituer un capital retraite complémentaire fiscalement optimisé.<br>
<br>
<b>Règles importantes</b><br>
• Les fonds sont bloqués jusqu'à l'âge de la retraite (sauf cas exceptionnels : invalidité, décès du conjoint, surendettement, fin de droits chômage, acquisition résidence principale)<br>
• La sortie en capital à la retraite est imposable à l'IR (mais à un taux généralement plus faible qu'en activité)<br>
• Les plafonds non utilisés sont reportables sur 3 ans — vérifiez votre plafond disponible sur impots.gouv.fr`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/particulier/le-plan-depargne-retraite',
        title: "Plan d'Épargne Retraite — Impôts.gouv.fr",
      },
    ],
  },

  {
    id: 'micro_cfe_cotisation_annuelle',
    category: 'Fiscalité',
    type: 'warning',
    priority: 3,
    title: 'CFE : provisionnez cette taxe annuelle dès votre deuxième année',
    summary:
      "La Cotisation Foncière des Entreprises est due chaque année par tous les micro-entrepreneurs à partir de la deuxième année d'activité, même si votre chiffre d'affaires est nul. Son montant varie de quelques centaines à plusieurs milliers d'euros selon votre commune et votre CA. C'est l'une des charges les plus souvent oubliées dans les plans de trésorerie des indépendants.",
    content: `<b>Comment est calculée la CFE</b><br>
La CFE est un impôt local basé sur la valeur locative cadastrale de vos locaux professionnels. Si vous exercez depuis votre domicile, une cotisation minimum est tout de même appliquée par votre commune.<br>
<br>
<b>Montants indicatifs selon le CA et la commune</b><br>
Pour un micro-entrepreneur avec un CA modéré :<br>
• Petite commune (< 5 000 hab.) : 200€ à 500€/an<br>
• Ville moyenne : 400€ à 1 200€/an<br>
• Grande métropole (Paris, Lyon, Marseille) : 800€ à 2 500€/an<br>
<br>
<b>Calendrier à retenir</b><br>
• Avis d'imposition reçu en <b>automne</b> (octobre-novembre)<br>
• Paiement exigible en <b>décembre</b> (acompte possible en juin si montant > 3 000€)<br>
<br>
<b>Ce que vous devez faire</b><br>
• Provisionnez mensuellement la CFE estimée dans votre trésorerie (diviser le montant estimé par 12)<br>
• Consultez votre espace professionnel sur impots.gouv.fr pour connaître votre cotisation exacte<br>
• En cas de difficultés, une demande de délai de paiement est possible auprès de votre service des impôts des entreprises (SIE)`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23547',
        title: 'Cotisation Foncière des Entreprises — Service-Public.fr',
      },
    ],
  },

  {
    id: 'micro_compte_bancaire_dedie',
    category: 'Fiscalité',
    type: 'information',
    priority: 4,
    title:
      'Compte bancaire dédié : une obligation progressive, une bonne pratique immédiate',
    summary:
      "En micro-entreprise, un compte bancaire dédié à votre activité professionnelle devient légalement obligatoire après 2 années consécutives de chiffre d'affaires supérieur à 10 000€. Même en deçà de ce seuil, ouvrir un compte dédié dès le départ simplifie considérablement votre comptabilité, sécurise vos déclarations fiscales et renforce votre crédibilité professionnelle. C'est une bonne pratique que tout comptable vous recommandera.",
    content: `<b>L'obligation légale</b><br>
Depuis 2018, tout micro-entrepreneur dont le CA dépasse 10 000€ <b>pendant deux années consécutives</b> est tenu d'ouvrir un compte bancaire dédié exclusivement à son activité professionnelle. Ce compte peut être un compte courant classique — il n'est pas obligatoirement un «compte pro» payant.<br>
<br>
<b>Pourquoi l'ouvrir dès maintenant, même si vous n'y êtes pas encore obligé</b><br>
• Séparation immédiate des flux pro et perso → déclarations de CA simplifiées<br>
• En cas de contrôle URSSAF ou fiscal, vos encaissements professionnels sont clairement identifiables<br>
• Suivi facilité de votre trésorerie professionnelle en temps réel<br>
• Image professionnelle renforcée : vos clients voient un IBAN dédié sur vos factures<br>
<br>
<b>Options disponibles</b><br>
• <b>Néo-banques sans frais</b> : Revolut Business (gratuit), Nickel Pro — parfaits pour les petits CA<br>
• <b>Néo-banques pro</b> : Shine, Qonto, Blank (7€ à 15€/mois) — meilleures intégrations comptables, exports automatisés<br>
• <b>Compte courant traditionnel dédié</b> : un compte courant classique dans votre banque habituelle, gratuit, suffit légalement<br>
<br>
<b>Documents pour l'ouverture</b><br>
Pièce d'identité, justificatif de domicile et votre attestation d'immatriculation URSSAF (téléchargeable sur autoentrepreneur.urssaf.fr).`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F35991',
        title: 'Compte bancaire professionnel — Service-Public.fr',
      },
    ],
  },
];

export default config;

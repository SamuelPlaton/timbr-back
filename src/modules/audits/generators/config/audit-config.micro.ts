import type { AuditConfigItem } from '../adapters/base.generator';

// TODO: IMPROVE

const config: AuditConfigItem[] = [
  {
    id: 'tns_tva_guide_accre',
    category: 'aides',
    type: 'information',
    priority: 3,
    title:
      "Vérifiez votre éligibilité à l'ACRE : jusqu'à 50% de cotisations en moins",
    summary:
      "L'ACRE est une aide méconnue qui réduit de moitié vos cotisations sociales pendant vos 12 premiers mois d'activité. Elle n'est pas automatique et réservée à certains profils — vérifiez si vous en faites partie avant qu'il ne soit trop tard pour la demander.",
    content: `<b>Qui peut en bénéficier ?</b><br>
L'ACRE est accessible aux micro-entrepreneurs appartenant à l'une de ces catégories :<br>
• Demandeur d'emploi indemnisé (ARE) ou inscrit à France Travail depuis plus de 6 mois dans les 18 derniers mois<br>
• Bénéficiaire du RSA ou de l'ASS<br>
• Personne âgée de moins de 26 ans (ou moins de 30 ans si reconnue travailleur handicapé)<br>
• Personne de 26 à 29 ans non indemnisée par France Travail<br>
• Créateur ou repreneur d'entreprise dans un Quartier Prioritaire de la Ville (QPV)<br>
• Repreneur d'une entreprise en redressement ou liquidation judiciaire<br>
<br>
<b>Ce que ça représente concrètement</b><br>
L'ACRE réduit vos taux de cotisations URSSAF de 50% pendant 12 mois à partir de votre immatriculation :<br>
• BIC ventes : 3,1% au lieu de 6,2%<br>
• BIC services / artisans : 6,15% au lieu de 12,3%<br>
• BNC : 10,6% au lieu de 21,2%<br>
<br>
Exemple : 40 000€ de CA en BNC → économie de <b>4 240€ sur la première année</b>.<br>
<br>
<b>Comment en faire la demande</b><br>
La demande doit être déposée via l'URSSAF lors de votre immatriculation ou dans les <b>45 jours suivants</b>. Passé ce délai, vous ne pouvez plus y prétendre pour cette création.<br>
<br>
<b>Points de vigilance</b><br>
• L'ACRE ne s'applique qu'une seule fois tous les 3 ans<br>
• À l'issue des 12 mois, vos cotisations reprennent leur taux normal — anticipez la hausse en trésorerie`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F11677',
        title: "ACRE : aide aux créateurs et repreneurs d'entreprise",
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur",
        website_name: 'URSSAF',
      },
    ],
  },

  {
    id: 'fiscalite_prelevements_liberatoires_danger',
    category: 'fiscalite',
    type: 'danger',
    priority: 2,
    title:
      'Versement libératoire inaccessible : déclarez vos revenus au barème progressif',
    summary:
      "Votre RFR N-2 dépasse 27 478€ par part fiscale, vous empêchant d'opter pour le versement libératoire de l'IR. Vous ne pouvez pas intégrer l'impôt à vos déclarations URSSAF. Une gestion prévisionnelle rigoureuse est nécessaire pour éviter une régularisation importante en fin d'année.",
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
        title: "Versement libératoire de l'IR",
        website_name: 'Impôts.gouv.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23267',
        title: 'Impôts et abattements',
        website_name: 'Service-Public.fr',
      },
    ],
  },

  {
    id: 'fiscalite_prelevements_acces_eligible',
    category: 'fiscalite',
    type: 'success',
    priority: 3,
    title:
      'Versement libératoire : vous êtes éligible — activez-le avant le 30 septembre',
    summary:
      "Votre RFR N-2 par part fiscale est inférieur au plafond de 28 797€. Vous pouvez opter pour le versement libératoire de l'IR, intégrant l'impôt dans vos cotisations URSSAF à taux fixe. Résultat : trésorerie prévisible, pas de régularisation et une économie potentielle significative.",
    content: `<b>Ce que ça change concrètement</b><br>
Au lieu de déclarer vos revenus micro au barème progressif de l'IR en fin d'année, vous payez votre impôt en même temps que vos cotisations URSSAF, à chaque déclaration de CA. Le taux est fixe et calculé sur votre chiffre d'affaires brut :<br>
• <b>1%</b> pour les ventes de marchandises (BIC achat-revente)<br>
• <b>1,7%</b> pour les prestations de services commerciales (BIC services)<br>
• <b>2,2%</b> pour les professions libérales (BNC)<br>
<br>
<b>À partir de ~40 000€ de CA, le versement libératoire est presque systématiquement avantageux</b><br>
À ce niveau, vous entrez dans la tranche à 11% (voire 30%) et l'écart avec le barème progressif devient significatif. Exemple pour un CA de <b>40 000€ en BNC</b> :<br>
• Barème progressif : 40 000€ × 66% (abattement 34%) = 26 400€ imposables → IR ≈ 1 760€ à 11%<br>
• Versement libératoire : 40 000€ × 2,2% = <b>880€</b><br>
→ Économie : environ <b>880€/an</b> à TMI 11% — et bien plus si vous êtes en tranche 30% (économie ≈ 6 000€).<br>
Pour BIC services (CA 40k€) : VL à 1,7% = 680€ vs barème à 11% ≈ 2 200€ → économie ≈ 1 500€.<br>
En dessous de 40 000€ ou si vos autres revenus du foyer sont faibles, vérifiez avec votre conseiller Timbr — le VL peut rester avantageux dès le premier euro facturé.<br>
<br>
<b>Vérifiez votre éligibilité sur votre avis d'imposition</b><br>
La condition est : <b>RFR N-2 ÷ nombre de parts fiscales ≤ 28 797€</b>.<br>
Ces deux informations figurent sur votre avis d'imposition, case «Revenu fiscal de référence» et case «Nombre de parts». Si vous avez un enfant à charge, votre nombre de parts augmente — ce qui peut vous rendre éligible même avec un RFR plus élevé.<br>
<br>
<b>Comment activer le versement libératoire</b><br>
L'option doit être exercée avant le <b>30 septembre</b> pour s'appliquer au 1er janvier de l'année suivante. Elle se fait depuis votre espace sur autoentrepreneur.urssaf.fr, rubrique «Gérer mon auto-entreprise».<br>
<br>
<b>Attention</b><br>
Si votre RFR dépasse le plafond dans les années suivantes, vous perdez automatiquement le bénéfice du versement libératoire au 1er janvier suivant. Révisez votre éligibilité chaque automne.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR",
        website_name: 'Impôts.gouv.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F36244',
        title: "Fiscalité de l'auto-entrepreneur",
        website_name: 'Service-Public.fr',
      },
    ],
  },

  {
    id: 'fiscalite_prelevements_calcul_gains',
    category: 'fiscalite',
    type: 'success',
    priority: 4,
    title: 'Votre gain estimé avec le versement libératoire : {{savings}}€/an',
    summary:
      "Avec votre CA de {{ca}}€, opter pour le versement libératoire plutôt que le barème progressif de l'IR vous ferait économiser environ {{savings}}€ par an. Ce calcul est basé sur votre activité réelle et la tranche marginale applicable à votre profil.",
    content: `<b>Votre calcul personnalisé</b><br>
Avec un CA de <b>{{ca}}€</b>, l'abattement forfaitaire de {{abattement_display}}% réduit votre revenu imposable à <b>{{income_imposable}}€</b>.<br>
<br>
<b>Barème progressif vs versement libératoire</b><br>
• Barème à 11% (tranche applicable à votre profil) : {{income_imposable}}€ × 11% = <b>{{ir_bareme}}€ d'IR</b><br>
• Versement libératoire à {{pl_rate_display}}% : {{ca}}€ × {{pl_rate_display}}% = <b>{{ir_pl}}€</b><br>
→ Économie estimée : <b>{{savings}}€ par an</b><br>
<br>
<b>Pourquoi le versement libératoire est avantageux dans votre cas</b><br>
Son taux fixe de {{pl_rate_display}}% s'applique directement au CA brut — bien en dessous du barème progressif dès la tranche à 11%. Si votre foyer fiscal monte en tranche 30% dans les années à venir, l'économie serait encore plus importante.<br>
<br>
<b>À retenir</b><br>
Cette estimation utilise uniquement votre CA et la tranche à 11%. Elle ne tient pas compte de vos autres revenus du foyer ni de vos déductions disponibles (PER, dons...). Votre conseiller Timbr peut affiner le chiffre exact selon votre situation complète.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/professionnel/le-versement-liberatoire',
        title: "Versement libératoire de l'IR",
        website_name: 'Impôts.gouv.fr',
      },
    ],
  },

  {
    id: 'fiscalite_urssaf_declaration',
    category: 'fiscalite',
    type: 'warning',
    priority: 2,
    title: 'Déclarations URSSAF : respectez vos échéances même à CA zéro',
    summary:
      "Vous devez déclarer votre CA à l'URSSAF chaque période (mensuelle ou trimestrielle), même à zéro euro. Tout retard ou oubli entraîne des pénalités automatiques et peut impacter vos droits sociaux. C'est l'une des obligations les plus négligées par les nouveaux entrepreneurs.",
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
Paramétrez des rappels automatiques dans votre agenda 5 jours avant chaque échéance. Vous pouvez aussi activer les notifications sur votre espace autoentrepreneur.urssaf.fr.<br>
<br>
<b>Vous avez déjà reçu une pénalité ? Vous pouvez en demander la remise</b><br>
L'URSSAF accorde régulièrement des remises gracieuses sur les majorations de retard, en particulier pour les premiers manquements. La démarche est simple : envoyez un courrier recommandé (ou un message via votre espace en ligne) à votre URSSAF en expliquant le contexte (oubli, difficulté passagère, erreur de bonne foi) et en joignant la preuve que vous avez régularisé. Il n'y a aucune garantie, mais le taux d'acceptation pour une première pénalité isolée est élevé — et ça ne coûte rien d'essayer.`,
    sources: [
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/toutes-les-fiches-pratiques/determiner-mon-chiffre-daffaires.html',
        title: "Déterminer son chiffre d'affaires",
        website_name: 'URSSAF Auto-Entrepreneur',
      },
      {
        url: 'https://abby.fr/blog/connaitre-le-taux-de-cotisations-sociales-urssaf-auto-entrepreneur/',
        title: 'Taux de cotisations URSSAF auto-entrepreneur',
        website_name: 'Abby',
      },
    ],
  },

  {
    id: 'micro_urssaf_plateformes_ca_facture',
    category: 'fiscalite',
    type: 'danger',
    priority: 3,
    title:
      'Plateformes et intermédiaires : déclarez le montant facturé, pas ce que vous recevez',
    summary:
      "Si vous passez par des plateformes (Malt, Uber, Fiverr...), déclarez à l'URSSAF le montant total facturé au client — pas le net reçu après commission. Cette erreur fréquente peut entraîner un redressement URSSAF en cas de contrôle.",
    content: `<b>La règle fondamentale</b><br>
Votre chiffre d'affaires à déclarer à l'URSSAF correspond au <b>montant total facturé au client final</b>, avant toute déduction de commission, frais de service ou retenue par la plateforme.<br>
<br>
<b>Exemple concret</b><br>
Vous réalisez une prestation à 1 000€ via une plateforme qui prend 10% de commission :<br>
• Montant facturé au client : <b>1 000€</b><br>
• Commission plateforme : 100€<br>
• Montant reçu sur votre compte : 900€<br>
• <b>Montant à déclarer à l'URSSAF : 1 000€</b> (pas 900€)<br>
<br>
<b>Pourquoi c'est important</b><br>
• En micro-entreprise, votre CA est votre base de calcul pour les cotisations ET l'impôt<br>
• Les commissions des plateformes ne sont <b>pas des charges déductibles</b> en micro (seul l'abattement forfaitaire s'applique)<br>
• En cas de contrôle, l'URSSAF compare vos déclarations avec les données transmises par les plateformes (obligation de déclaration des plateformes depuis 2020)<br>
• Un écart systématique entre vos déclarations et les données plateformes déclenche un redressement<br>
<br>
<b>Comment bien faire</b><br>
• Conservez toutes vos factures émises (pas seulement les relevés de la plateforme)<br>
• Tenez un registre de CA basé sur les montants facturés, pas sur les virements reçus<br>
• Vérifiez chaque mois que votre CA déclaré correspond bien au total des factures émises<br>
<br>
<b>Astuce</b><br>
Si les commissions de plateforme représentent une part importante de votre CA (> 15-20%), c'est un signal que le régime micro n'est peut-être plus optimal — en société, ces commissions seraient des charges déductibles.`,
    sources: [
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/toutes-les-fiches-pratiques/determiner-mon-chiffre-daffaires.html',
        title: "Déterminer son chiffre d'affaires",
        website_name: 'URSSAF Auto-Entrepreneur',
      },
    ],
  },

  {
    id: 'fiscalite_reductions_entreprise_orange',
    category: 'fiscalite',
    type: 'warning',
    priority: 2,
    title:
      "Vos frais réels dépassent probablement l'abattement forfaitaire du régime micro",
    summary:
      "L'abattement forfaitaire micro ne reflète pas forcément vos frais réels. Avec des charges estimées à {{professional_expenses}}€, un régime de déduction réelle pourrait être fiscalement plus avantageux. C'est souvent le premier signal pour envisager une transition vers une société.",
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
        title: 'Impôts et abattements',
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://lamicrobyflo.fr/abattement-forfaitaire-micro-entreprise/',
        title: 'Abattement forfaitaire micro-entreprise',
        website_name: 'LaMicroByFlo',
      },
      {
        url: 'https://www.l-expert-comptable.com/a/37794-tva-et-auto-entrepreneur.html',
        title: 'TVA et déduction de frais',
        website_name: "L'Expert-Comptable.com",
      },
    ],
  },

  {
    id: 'fiscalite_plafonds_cotisations',
    category: 'fiscalite',
    type: 'danger',
    priority: 1,
    title:
      'Alerte : votre CA de {{ca}}€ approche du plafond de {{ca_threshold}}€',
    summary:
      'Avec {{ca}}€ de CA, vous dépassez 85% du plafond de {{ca_threshold}}€ de la micro-entreprise. Au-delà de ce seuil deux années de suite, vous basculez vers le régime réel — une transition aux obligations plus lourdes à anticiper dès maintenant.',
    content: `<b>Votre situation</b><br>
Votre CA de <b>{{ca}}€</b> représente plus de 85% du plafond de <b>{{ca_threshold}}€</b>. Vous entrez dans la zone d'alerte — un CA similaire l'année prochaine déclencherait le changement de régime obligatoire.<br>
<br>
<b>Les plafonds de CA de la micro-entreprise (2026)</b><br>
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
        title: "Fiscalité de l'auto-entrepreneur",
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32353',
        title: 'Passage du régime micro au régime réel',
        website_name: 'Service-Public.fr',
      },
    ],
  },

  {
    id: 'micro_seuil_tva_franchise',
    category: 'tva',
    type: 'warning',
    priority: 3,
    title:
      'TVA franchise : votre CA de {{ca}}€ — il vous reste {{ca_restant}}€ avant le seuil',
    summary:
      'Le seuil de franchise TVA ({{tva_seuil_base}}€) est indépendant du plafond micro. Dépasser ce seuil sans le savoir expose à des redressements — et la règle sur le moment exact du basculement est bien plus piégeuse que vous ne le pensez.',
    content: `<b>Votre position actuelle</b><br>
CA déclaré cette année : <b>{{ca}}€</b><br>
Seuil de franchise en base : <b>{{tva_seuil_base}}€</b><br>
Seuil majoré (basculement immédiat si dépassé) : <b>{{tva_seuil_majore}}€</b><br>
Marge restante avant le seuil de base : <b>{{ca_restant}}€</b><br>
<br>
<b>Les deux seuils TVA à distinguer absolument</b><br>
• Sous <b>{{tva_seuil_base}}€</b> : franchise totale. Vous ne facturez pas de TVA, vous ne la récupérez pas. Mention obligatoire sur chaque facture : «TVA non applicable, article 293B du CGI».<br>
• Entre {{tva_seuil_base}}€ et <b>{{tva_seuil_majore}}€</b> : vous dépassez le seuil de base mais restez en franchise jusqu'au 31 décembre. TVA obligatoire à partir du 1er janvier suivant.<br>
• Au-delà de <b>{{tva_seuil_majore}}€</b> : basculement immédiat — TVA obligatoire à partir du 1er jour du mois du dépassement. Pas de délai.<br>
<br>
<b>La règle que la plupart des micro-entrepreneurs ignorent : facturez avec TVA AVANT d'encaisser</b><br>
Si vous avez une facture en attente de paiement dont l'encaissement fera dépasser <b>{{tva_seuil_majore}}€</b>, votre facture suivante doit déjà inclure la TVA — même si la première n'est pas encore payée.<br>
<br>
Exemple concret : votre CA est à 36 000€. Vous envoyez une facture de 6 000€ (total cumulé : 42 000€, soit > {{tva_seuil_majore}}€). Cette facture n'est pas encore encaissée, mais vous savez qu'elle le sera. La prochaine facture que vous émettez doit déjà inclure 20% de TVA. Pourquoi ? Dès que le paiement des 6 000€ arrive, vous basculez au TVA à partir du 1er de ce mois. Toute facture émise dans ce mois sans TVA = irrégularité fiscale.<br>
<br>
<b>Comment ne pas se faire piéger</b><br>
• Suivez votre CA encaissé en temps réel — pas seulement à la déclaration URSSAF<br>
• Dès qu'une facture en attente va vous faire franchir {{tva_seuil_majore}}€, demandez votre numéro de TVA intracommunautaire sur impots.gouv.fr (obtention en quelques jours, gratuit)<br>
• Informez vos clients du changement avant votre première facture avec TVA<br>
<br>
<b>Rappel : seuil TVA ≠ plafond micro-entreprise</b><br>
Vous pouvez rester micro-entrepreneur (CA < {{tva_seuil_majore}}€ selon activité) tout en étant assujetti à la TVA. Ce sont deux règles indépendantes.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F21746',
        title: 'Franchise en base de TVA',
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://www.impots.gouv.fr/professionnel/la-tva',
        title: 'La TVA',
        website_name: 'Impôts.gouv.fr',
      },
    ],
  },

  {
    id: 'simulation_micro_entreprise_status',
    category: 'fiscalite',
    type: 'success',
    priority: 4,
    title:
      'Votre statut micro-entrepreneur est parfaitement adapté à votre activité',
    summary:
      "Votre CA est bien inférieur aux plafonds micro, confirmant que ce statut est optimal pour vous. Comptabilité allégée, cotisations proportionnelles à vos encaissements et grande liberté de fonctionnement. Suivez l'évolution de votre CA pour anticiper une éventuelle transition.",
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
        title: "Fiscalité de l'auto-entrepreneur",
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur",
        website_name: 'URSSAF',
      },
    ],
  },

  {
    id: 'micro_transition_vers_societe',
    category: 'fiscalite',
    type: 'warning',
    priority: 1,
    title:
      'Avec {{ca}}€ de CA, la comparaison micro vs SASU/EURL devient sérieuse',
    summary:
      'En micro, vous payez {{cotisations_micro}}€ de cotisations sur {{ca}}€ de CA brut, sans déduire vos frais. En SASU/EURL, les charges portent sur votre salaire uniquement. À votre niveau de CA, une simulation peut révéler un avantage net significatif.',
    content: `<b>Le problème fondamental de la micro à votre CA</b><br>
En micro-entreprise, vos cotisations sont calculées sur la totalité de votre CA au taux de <b>{{cotisation_rate_display}}%</b>, soit <b>{{cotisations_micro}}€</b> cette année. Ce montant est dû même si vous avez des frais professionnels importants — la micro ne tient pas compte de vos charges réelles.<br>
<br>
<b>Comparaison avec votre CA de {{ca}}€ ({{activite_type}})</b><br>
• <b>Micro-entreprise</b> : cotisations sociales = <b>{{cotisations_micro}}€</b> sur l'intégralité du CA<br>
• <b>SASU avec salaire de {{salaire_sasu_exemple}}€</b> (40% du CA) : cotisations ≈ <b>{{cotisations_sasu}}€</b>, et <b>{{reste_societe}}€</b> restent dans la société pour couvrir vos frais déductibles ou être distribués en dividendes<br>
• Le gain net dépend de vos frais professionnels réels — dès que ceux-ci dépassent l'abattement forfaitaire de {{abattement_display}}%, la SASU devient souvent plus avantageuse<br>
<br>
<b>Signaux qui indiquent qu'il faut agir maintenant</b><br>
• Vos frais professionnels réels dépassent l'abattement forfaitaire de {{abattement_display}}% appliqué en micro<br>
• Votre CA de {{ca}}€ progresse d'année en année<br>
• Vous approchez du plafond micro de {{ca_plafond}}€<br>
• Vous souhaitez une meilleure protection sociale (retraite, maladie, prévoyance)<br>
<br>
<b>Prochaine étape</b><br>
Votre conseiller Timbr peut réaliser une simulation complète micro vs SASU/EURL en intégrant votre CA, vos frais réels, votre TMI et vos objectifs de revenus.`,
    sources: [
      {
        url: 'https://bpifrance-creation.fr/encyclopedie/structures-juridiques/choix-du-statut-generalites/criteres-choix-structure-juridique',
        title: 'Critères de choix de structure juridique',
        website_name: 'BPI France Création',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F32353',
        title: 'Passage du régime micro au régime réel',
        website_name: 'Service-Public.fr',
      },
      {
        url: 'https://www.shine.fr/blog/sasu-sarl/',
        title: 'SASU vs SARL',
        website_name: 'Shine',
      },
    ],
  },

  {
    id: 'micro_retraite_zero_ca_risque',
    category: 'optimisation',
    type: 'danger',
    priority: 2,
    title:
      'Attention : pas de CA déclaré signifie pas de trimestres de retraite',
    summary:
      'Votre CA de {{ca}}€ est sous le minimum de {{retraite_min_ca}}€ pour valider des trimestres de retraite. En micro, pas de CA = pas de cotisations = pas de trimestres — un angle mort que beaucoup découvrent trop tard.',
    content: `<b>Votre situation</b><br>
Votre CA déclaré de <b>{{ca}}€</b> est inférieur au seuil minimum de <b>{{retraite_min_ca}}€</b> nécessaire pour valider les 4 trimestres de retraite annuels. Sans atteindre ce seuil, vous ne cotisez pas suffisamment pour valider des trimestres cette année.<br>
<br>
<b>La règle clé : CA minimum pour valider les 4 trimestres annuels</b><br>
Pour valider un trimestre de retraite, votre CA doit générer suffisamment de cotisations. Les seuils pour valider les <b>4 trimestres annuels</b> sont :<br>
• BNC (professions libérales) : <b>10 850€</b> de CA annuel<br>
• BIC services : <b>13 992€</b> de CA annuel<br>
• BIC ventes de marchandises : <b>24 115€</b> de CA annuel<br>
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
        title: 'Taux de cotisations URSSAF auto-entrepreneur',
        website_name: 'Abby',
      },
      {
        url: 'https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html',
        title: "L'essentiel du statut auto-entrepreneur",
        website_name: 'URSSAF',
      },
    ],
  },

  {
    id: 'micro_per_epargne_retraite',
    category: 'optimisation',
    type: 'success',
    priority: 3,
    title:
      'PER : réduisez votre IR maintenant tout en préparant votre retraite',
    summary:
      "Le PER est accessible aux micro-entrepreneurs avec un double avantage : réduire votre IR de l'année en cours tout en constituant une épargne retraite. Vos versements sont déductibles du revenu global, indépendamment de l'abattement forfaitaire micro. Un levier d'économies fiscales significatif.",
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
        title: "Plan d'Épargne Retraite",
        website_name: 'Impôts.gouv.fr',
      },
    ],
  },

  {
    id: 'micro_cfe_cotisation_annuelle',
    category: 'fiscalite',
    type: 'warning',
    priority: 3,
    title: 'CFE : provisionnez cette taxe annuelle dès votre deuxième année',
    summary:
      "La CFE est due chaque année par tous les micro-entrepreneurs dès la deuxième année, même à CA nul. Son montant varie de quelques centaines à plusieurs milliers d'euros selon votre commune. C'est l'une des charges les plus souvent oubliées par les indépendants.",
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
        title: 'Cotisation Foncière des Entreprises',
        website_name: 'Service-Public.fr',
      },
    ],
  },

  {
    id: 'micro_compte_bancaire_dedie',
    category: 'fiscalite',
    type: 'information',
    priority: 4,
    title:
      'Compte bancaire dédié : une obligation progressive, une bonne pratique immédiate',
    summary:
      "Un compte bancaire dédié devient obligatoire après 2 ans de CA supérieur à 10 000€. Même en deçà, l'ouvrir dès le départ simplifie votre comptabilité, sécurise vos déclarations fiscales et renforce votre crédibilité professionnelle. Une bonne pratique recommandée par tout comptable.",
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
        title: 'Compte bancaire professionnel',
        website_name: 'Service-Public.fr',
      },
    ],
  },
  {
    id: 'micro_abattement_explication',
    category: 'fiscalite',
    type: 'information',
    priority: 4,
    title:
      "L'abattement forfaitaire : comment vous serez imposé sans versement libératoire",
    summary:
      "En micro-entreprise, si vous n'optez pas pour le versement libératoire, vos revenus sont soumis au barème progressif de l'impôt sur le revenu — mais pas sur la totalité de votre CA. L'administration fiscale applique automatiquement un abattement forfaitaire qui réduit votre base imposable. Cet abattement remplace la déduction de vos frais réels : il est censé couvrir forfaitairement l'ensemble de vos charges professionnelles.",
    content: `<b>Qu'est-ce que l'abattement forfaitaire ?</b><br>
L'abattement est un pourcentage de réduction automatique appliqué sur votre CA brut pour déterminer votre revenu imposable. L'administration considère que ce pourcentage couvre vos charges professionnelles — vous ne pouvez donc pas déduire vos frais réels en plus.<br>
<br>
<b>Les taux selon votre activité</b><br>
• <b>Achat / revente de marchandises (BIC ventes)</b> : abattement de <b>71%</b> → seuls 29% de votre CA sont imposés<br>
• <b>Prestations de services commerciales (BIC services)</b> : abattement de <b>50%</b> → la moitié de votre CA est imposée<br>
• <b>Professions libérales (BNC)</b> : abattement de <b>34%</b> → 66% de votre CA sont imposés<br>
<br>
<b>Votre situation : activité {{activite_type}}</b><br>
Avec un CA de <b>{{ca}}€</b> et un abattement de {{abattement_display}}%, votre revenu imposable est de <b>{{revenu_imposable}}€</b>. Ce montant est ajouté à vos autres revenus (et ceux de votre foyer) pour le calcul de l'IR au barème progressif.<br>
<br>
<b>Quand l'abattement est défavorable</b><br>
Si vos frais professionnels réels dépassent le montant de l'abattement (par exemple, plus de 34% du CA en BNC), le régime micro vous pénalise. Dans ce cas, un passage en société (où les frais sont déductibles au réel) peut être plus avantageux.<br>
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
        title: "Fiscalité de l'auto-entrepreneur",
        website_name: 'Service-Public.fr',
      },
    ],
  },
];

export default config;

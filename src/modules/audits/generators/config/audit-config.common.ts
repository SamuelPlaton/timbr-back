import type { AuditConfigItem } from '../adapters/base.generator';

// TODO: IMPROVE

const config: AuditConfigItem[] = [
  {
    id: 'tresorerie_assurances_placements',
    category: 'Fiscalité',
    type: 'information',
    priority: 4,
    title:
      "Placements et assurances : optimisez votre trésorerie d'entrepreneur",
    summary:
      "En tant qu'entrepreneur, vous n'avez plus d'employeur pour financer votre épargne retraite ou votre couverture santé — vous devez construire ces protections vous-même. Il existe des solutions adaptées aux indépendants qui combinent avantage fiscal immédiat et constitution d'un capital à long terme. Bien utilisées, elles peuvent représenter plusieurs milliers d'euros d'économies fiscales annuelles.",
    content: `Plusieurs outils permettent d'optimiser votre trésorerie tout en préparant l'avenir :<br>
<br>
<b>Plan d'Épargne Retraite (PER)</b><br>
Les versements volontaires sont déductibles de votre revenu imposable (jusqu'à 10% du PASS, soit environ 4 637€ en 2024 pour les salariés, davantage pour les TNS). Si votre TMI (Tranche marginale d'Imposition) est à 30%, chaque 1 000€ versé génère 300€ d'économie d'IR immédiate. Les fonds sont bloqués jusqu'à la retraite sauf accidents de la vie.<br>
<br>
<b>Assurance-vie</b><br>
Souple et disponible à tout moment, l'assurance-vie offre une fiscalité avantageuse après 8 ans (abattement annuel de 4 600€ pour un célibataire, 9 200€ pour un couple). Elle est idéale pour votre épargne de précaution à moyen terme et peut servir de complément retraite.<br>
<br>
<b>Comptes et livrets</b><br>
Pour votre trésorerie court terme, les livrets réglementés (Livret A, LDDS) offrent une rémunération garantie sans risque et une disponibilité immédiate. À ne pas négliger pour votre fonds de roulement.<br>
<br>
Votre conseiller Timbr peut vous aider à choisir la combinaison optimale selon votre situation.`,
    sources: [
      {
        url: 'https://www.impots.gouv.fr/particulier/le-plan-depargne-retraite',
        title: "Plan d'Épargne Retraite — Impôts.gouv.fr",
      },
    ],
  },

  {
    id: 'tresorerie_impots_reduction_date_cloture',
    category: 'Fiscalité',
    type: 'warning',
    priority: 3,
    title: "Date de clôture non standard : anticipez l'impact fiscal",
    summary:
      "Votre exercice comptable ne se clôture pas au 31 décembre, ce qui peut créer un premier exercice court ou décalé avec des implications fiscales spécifiques. Cette configuration mérite une attention particulière pour en maximiser les avantages et éviter les mauvaises surprises. La durée d'un exercice peut varier entre 6 et 18 mois lors de la création d'une société.",
    content: `Votre date de clôture comptable est fixée au <b>{{closing_date}}</b>, différente du 31 décembre standard.<br>
<br>
<b>Impact d'un premier exercice court</b><br>
Un exercice de moins de 12 mois réduit mécaniquement le bénéfice imposable prorata temporis. Cela peut permettre de rester sous le seuil des <b>42 500€ de bénéfice</b> soumis au taux réduit d'IS de 15%, ou de décaler une part de revenus sur l'exercice suivant.<br>
<br>
<b>Avantages potentiels</b><br>
• Décaler le paiement de l'IS ou de l'IR selon votre situation<br>
• Ajuster provisions et amortissements sur une période courte<br>
• Optimiser la date de versement de votre rémunération selon l'exercice fiscal<br>
• Lisser les pics de résultat entre deux exercices<br>
<br>
<b>Points de vigilance</b><br>
Le premier exercice ne peut excéder 24 mois au total. Une clôture décalée peut complexifier vos déclarations fiscales et sociales. Assurez-vous que votre expert-comptable est bien informé de cette configuration dès le départ.`,
    sources: [],
  },

  {
    id: 'tresorerie_impots_plafonds_preferences',
    category: 'Fiscalité',
    type: 'information',
    priority: 4,
    title: 'Connaissez vos plafonds fiscaux pour optimiser chaque euro',
    summary:
      "En tant qu'entrepreneur, l'État vous donne accès à des plafonds de déduction que la plupart des gens ne connaissent pas. Bien utilisés, ils peuvent vous faire économiser plusieurs centaines voire milliers d'euros d'impôts par an — légalement. Le problème : ils ont une date limite et s'évaporent si vous ne les utilisez pas avant le 31 décembre.",
    content: `Voici les 3 leviers les plus concrets pour réduire votre impôt en tant qu'entrepreneur :<br>
<br>
<b>1. Le PER (Plan Épargne Retraite) — le plus puissant</b><br>
Chaque euro que vous versez sur un PER est <b>déduit de votre revenu imposable</b>. Concrètement : si vous êtes imposé à 30%, verser 3 000€ sur votre PER vous coûte réellement 2 100€ — l'État finance les 900€ restants via l'économie d'impôt. Plafond : jusqu'à 10% de vos revenus professionnels. Les droits non utilisés sont reportables 3 ans.<br>
<br>
<b>2. Les dons aux associations — rapide et sous-estimé</b><br>
Un don de 100€ à une association reconnue d'utilité publique vous coûte <b>34€ nets</b> (réduction d'IR de 66%). Pour certaines associations (aide aux personnes en difficulté), la réduction monte à 75%. Plafond : 20% de votre revenu imposable.<br>
<br>
<b>3. Les frais déductibles — vérifiez que vous ne manquez rien</b><br>
En société, toutes vos dépenses professionnelles réelles (matériel, logiciels, déplacements, formation...) réduisent votre bénéfice imposable. En micro-entreprise, c'est l'abattement forfaitaire qui s'applique — vous ne pouvez pas déduire les frais réels, ce qui peut justifier un changement de structure à partir d'un certain niveau de charges.<br>
<br>
<b>À faire avant le 31 décembre</b><br>
Ces plafonds sont annuels. Ce que vous n'utilisez pas cette année (sauf PER) est perdu. Faites le point sur votre situation dès maintenant avec votre conseiller Timbr.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23267',
        title: 'Impôts et abattements — Service-Public.fr',
      },
    ],
  },

  {
    id: 'tresorerie_impots_tmi_optimisation',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title:
      'Tranche marginale élevée : chaque euro non optimisé est un euro perdu',
    summary:
      "Votre revenu fiscal de référence vous place dans une tranche marginale d'imposition à 30% ou plus, ce qui signifie que chaque euro de revenu supplémentaire est fortement taxé par l'État. À ce niveau d'imposition, des stratégies d'optimisation concrètes permettent de récupérer plusieurs centaines voire milliers d'euros par an. Agir avant la fin de l'année fiscale est essentiel pour maximiser l'impact de ces leviers.",
    content: `Votre TMI (Tranche marginale d'imposition) élevé rend certaines stratégies particulièrement efficaces et rentables :<br>
<br>
<b>Plan d'Épargne Retraite (PER) — levier n°1</b><br>
C'est le dispositif le plus puissant à votre niveau d'imposition. Chaque euro versé réduit directement votre revenu imposable. Exemple : à 41% de TMI, un versement de 5 000€ sur votre PER génère <b>2 050€ d'économie fiscale immédiate</b> — tout en préparant votre retraite.<br>
<br>
<b>Dons aux associations</b><br>
Les dons à des organismes d'intérêt général ouvrent droit à une réduction d'IR de 66% du montant donné (dans la limite de 20% du revenu imposable). Pour 1 000€ donnés, votre IR baisse de 660€.<br>
<br>
<b>Optimisation de votre rémunération</b><br>
Selon votre structure juridique, ajuster le mix salaire/dividendes peut réduire votre base imposable IR tout en maintenant votre niveau de vie. Cette optimisation doit être simulée globalement sur votre foyer fiscal.<br>
<br>
<b>Déficit foncier</b><br>
Si vous avez des revenus locatifs, les travaux de rénovation génèrent un déficit déductible du revenu global (jusqu'à 10 700€ par an), ce qui peut significativement abaisser votre revenu imposable.`,
    sources: [],
  },

  {
    id: 'tresorerie_cpf_formations',
    category: 'Social',
    type: 'success',
    priority: 5,
    title: 'CPF : vos droits à la formation accumulés, pensez à les utiliser',
    summary:
      "Votre CPF accumule des droits chaque année, et ils vous appartiennent quoi qu'il arrive — changement de statut, création d'entreprise, reconversion. En tant qu'entrepreneur, vous pouvez les utiliser pour financer des formations qui améliorent directement votre activité ou votre employabilité. Beaucoup d'indépendants ont des centaines voire des milliers d'euros disponibles sans le savoir.",
    content: `Le CPF est crédité de <b>500€ par an</b> (plafonné à 5 000€ cumulés). Vérifiez votre solde sur <b>moncompteformation.gouv.fr</b> — vous avez peut-être plus que vous ne pensez si vous étiez salarié avant.<br>
<br>
<b>Exemples concrets utiles pour un entrepreneur</b><br>
• <b>Permis moto (A ou A2)</b> — si vous vous déplacez chez des clients, le permis moto est éligible au CPF et peut vous faire gagner un temps considérable en ville<br>
• <b>TOEIC / TOEFL / anglais professionnel</b> — certifications de langue entièrement finançables, valorisées sur les missions B2B et les appels d'offres internationaux<br>
• <b>Coaching professionnel certifié</b> — accompagnement au développement de votre activité, gestion du stress, leadership : certains programmes sont éligibles CPF<br>
• <b>Certifications métier</b> (Google, Microsoft, AWS, gestion de projet PMP/Prince2, comptabilité...) — renforcent votre crédibilité et peuvent débloquer de nouvelles missions ou des tarifs plus élevés<br>
• <b>Bilan de compétences</b> — jusqu'à 2 000€ financés à 100%, utile si vous hésitez sur l'orientation de votre activité<br>
<br>
<b>Astuces pratiques</b><br>
• Les droits CPF se cumulent d'une année sur l'autre — si vous n'avez jamais utilisé votre CPF, vous avez peut-être plusieurs milliers d'euros disponibles dès maintenant<br>
• En cas de solde insuffisant, un co-financement est possible avec votre OPCO, votre Région, ou un reste à charge personnel<br>
• Méfiez-vous des arnaques : ne donnez jamais votre numéro de sécurité sociale par téléphone à des démarcheurs CPF`,
    sources: [
      {
        url: 'https://www.moncompteformation.gouv.fr',
        title: 'Mon Compte Formation',
      },
    ],
  },

  {
    id: 'common_facturation_conforme',
    category: 'Fiscalité',
    type: 'warning',
    priority: 2,
    title: 'Mentions obligatoires sur vos factures : êtes-vous en conformité ?',
    summary:
      "Chaque facture émise doit comporter un ensemble de mentions légales précisément définies par le Code de Commerce et le Code Général des Impôts. L'absence d'une seule mention peut entraîner des amendes lors d'un contrôle fiscal et des litiges avec vos clients. La conformité de vos factures est aussi un signal de professionnalisme qui renforce la confiance de vos partenaires et clients.",
    content: `Voici les mentions obligatoires que chaque facture doit impérativement contenir :<br>
<br>
<b>Identification de l'émetteur</b><br>
• Numéro SIREN : <b>{{siren}}</b><br>
• Dénomination sociale complète<br>
• Adresse du siège social<br>
• Forme juridique et montant du capital social (si société)<br>
• Numéro de TVA intracommunautaire (si assujetti)<br>
<br>
<b>Identification de la facture</b><br>
• Date d'émission<br>
• Numéro de facture unique et séquentiel (sans saut ni doublon)<br>
• Date de réalisation de la prestation ou de livraison<br>
<br>
<b>Détail de la prestation</b><br>
• Description précise des biens ou services fournis<br>
• Quantité, prix unitaire HT, remises accordées<br>
• Taux de TVA par ligne, ou mention de franchise en base si non assujetti<br>
• Total HT, montant de TVA, total TTC<br>
<br>
<b>Conditions de règlement</b><br>
• Date limite de paiement<br>
• Taux de pénalités de retard (au minimum 3× le taux d'intérêt légal)<br>
• Indemnité forfaitaire de recouvrement de 40€ en B2B (mention obligatoire)<br>
<br>
<b>Sanctions</b><br>
75€ d'amende par mention manquante sur les factures, jusqu'à 15€ par exemplaire non conforme lors d'un contrôle.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F31808',
        title: 'Mentions obligatoires sur les factures — Service-Public.fr',
      },
    ],
  },

  {
    id: 'common_protection_sociale',
    category: 'Social',
    type: 'warning',
    priority: 2,
    title:
      "RC Pro, prévoyance et mutuelle : votre protection en tant qu'indépendant",
    summary:
      "En quittant le salariat — ou en ne l'ayant jamais connu — vous perdez les protections financées par un employeur : mutuelle collective, prévoyance, couverture des accidents du travail. En tant qu'indépendant, tout repose sur vous. Un arrêt maladie d'un mois sans prévoyance peut représenter plusieurs milliers d'euros de revenus perdus. La bonne nouvelle : des solutions existent, et elles sont souvent moins chères que ce qu'on imagine.",
    content: `<b>1. RC Pro — vérifiez votre obligation avant votre premier client</b><br>
La Responsabilité Civile Professionnelle couvre les dommages causés à des tiers dans le cadre de votre activité (erreur de conseil, livrable défectueux, accident chez un client). Elle est <b>légalement obligatoire</b> pour :<br>
• Bâtiment : artisans, architectes, maîtres d'œuvre (+ garantie décennale)<br>
• Médical et paramédical : médecins, infirmiers, kinés, ostéopathes...<br>
• Professions juridiques et financières : avocats, experts-comptables, notaires<br>
• Agents immobiliers, courtiers en assurance, conseillers financiers<br>
Pour toutes les autres activités, elle est <b>fortement recommandée</b> — un seul incident non couvert peut engager l'ensemble de votre patrimoine personnel.<br>
Coût : 150€ à 500€/an pour un consultant ou développeur, 500€ à 3 000€/an pour le BTP.<br>
<br>
<b>2. Prévoyance / maintien des revenus — le risque le plus sous-estimé</b><br>
En cas d'arrêt maladie ou d'accident, la Sécurité Sociale des Indépendants verse des indemnités journalières très limitées : environ <b>20€/jour</b> pour un micro-entrepreneur, avec un délai de carence de 3 jours (7 jours pour les professions libérales). C'est insuffisant pour couvrir vos charges fixes. Une prévoyance complémentaire couvre la différence entre vos revenus habituels et les indemnités légales. Elle devient indispensable dès que vous générez plus de 2 000€/mois de revenus.<br>
Coût : 30€ à 80€/mois selon le niveau de couverture et votre âge.<br>
<br>
<b>3. Mutuelle santé TNS — à mettre en place avant votre premier jour</b><br>
Sans employeur, vous devez souscrire une complémentaire santé individuelle (contrat «Madelin» ou TNS). Ces contrats sont généralement plus coûteux que les contrats collectifs d'entreprise, mais les cotisations sont déductibles de votre revenu imposable si vous êtes en société. Comptez entre 80€ et 200€/mois selon votre profil.<br>
<br>
<b>Où comparer</b><br>
Des comparateurs en ligne (Hiscox, AXA Pro, April, Wemind, Alan) proposent des devis instantanés pour la RC Pro et la mutuelle. Pour la prévoyance, faites simuler votre couverture par votre conseiller Timbr.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23442',
        title: 'Assurance RC Pro — Service-Public.fr',
      },
      {
        url: 'https://talks.freelancerepublik.com/wemind-ou-alan-quelle-mutuelle-pour-les-freelances/',
        title: 'Mutuelles & assurances pour freelances — Freelance Republik',
      },
    ],
  },

  {
    id: 'common_cfe_premiere_annee',
    category: 'Fiscalité',
    type: 'success',
    priority: 3,
    title: 'CFE : la taxe que personne ne vous explique avant de se lancer',
    summary:
      "La Cotisation Foncière des Entreprises est un impôt local que toutes les entreprises doivent payer chaque année — sauf la première. Que vous soyez en train de vous lancer ou tout juste immatriculé, c'est le bon moment pour comprendre ce qui vous attend et éviter la mauvaise surprise à la fin de l'année 2.",
    content: `<b>Qu'est-ce que la CFE ?</b><br>
La CFE est un impôt local annuel dû par toutes les entreprises — micro-entrepreneurs inclus — à partir de la <b>deuxième année d'activité</b>. Elle est calculée sur la valeur locative des locaux utilisés pour votre activité (ou un montant minimum si vous travaillez depuis chez vous).<br>
<br>
<b>La bonne nouvelle : l'année de création, vous en êtes exonéré</b><br>
Quelle que soit votre structure, votre première année complète d'activité est toujours exonérée de CFE. C'est automatique — mais vous devez quand même <b>déclarer votre activité avant le 31 décembre</b> de l'année de création via votre espace professionnel sur impots.gouv.fr pour en bénéficier.<br>
<br>
<b>Montants à prévoir dès l'année 2</b><br>
• Petite commune (< 5 000 hab.) : 200€ à 500€/an<br>
• Ville moyenne : 400€ à 1 200€/an<br>
• Grande ville (Paris, Lyon, Marseille) : 800€ à 2 500€/an et plus<br>
<br>
<b>Ce qu'il faut faire maintenant</b><br>
• Si vous êtes en cours de création : notez-le dans votre budget dès l'année 2<br>
• Si vous venez de vous immatriculer : vérifiez que votre enregistrement est bien visible sur votre espace impots.gouv.fr<br>
• Dans tous les cas : provisionnez ce montant mensuellement pour ne pas être surpris en décembre`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23547',
        title: 'Cotisation Foncière des Entreprises — Service-Public.fr',
      },
    ],
  },
];

export default config;

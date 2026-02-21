import type { AuditConfigItem } from '../adapters/base.generator';

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
Les versements volontaires sont déductibles de votre revenu imposable (jusqu'à 10% du PASS, soit environ 4 637€ en 2024 pour les salariés, davantage pour les TNS). Si votre TMI est à 30%, chaque 1 000€ versé génère 300€ d'économie d'IR immédiate. Les fonds sont bloqués jusqu'à la retraite sauf accidents de la vie.<br>
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
      'Chaque entrepreneur dispose de plafonds fiscaux et sociaux spécifiques qui, bien utilisés, permettent de réduire significativement la charge fiscale globale du foyer. Ces leviers sont trop souvent découverts tardivement, après avoir laissé des économies substantielles sur la table. Les connaître dès maintenant vous donne un avantage concret sur votre fiscalité annuelle.',
    content: `Voici les principaux plafonds qui s'appliquent à votre situation d'entrepreneur :<br>
<br>
<b>Plafond PER (Plan d'Épargne Retraite)</b><br>
Déduction possible jusqu'à 10% de vos revenus professionnels nets (8x PASS maximum, soit 37 094€ en 2024 pour les salariés). Les plafonds non utilisés sont cumulables et reportables sur les 3 années suivantes — vérifiez votre plafond disponible dans votre espace impots.gouv.fr.<br>
<br>
<b>Plafond de la Sécurité Sociale (PASS)</b><br>
Fixé à 46 368€ en 2024, le PASS est la référence de calcul pour vos cotisations retraite, votre prévoyance et de nombreux dispositifs d'épargne. Le maîtriser vous aide à comprendre vos bulletins de cotisation.<br>
<br>
<b>Abattements spécifiques</b><br>
• Frais professionnels forfaitaires : 10% du salaire net en IR (plafonné à 13 522€ en 2024)<br>
• Dons aux associations : réduction IR de 66% à 75% du montant donné<br>
• Déficit foncier : jusqu'à 10 700€ déductibles de votre revenu global<br>
<br>
Votre conseiller Timbr peut analyser votre situation et identifier les plafonds que vous n'utilisez pas encore.`,
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
    content: `Votre TMI élevé rend certaines stratégies particulièrement efficaces et rentables :<br>
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
      'Votre Compte Personnel de Formation accumule des droits chaque année que vous pouvez utiliser pour financer des formations professionnelles, des certifications, un bilan de compétences ou une VAE. Ces droits sont personnels, portables quel que soit votre statut, et ne disparaissent pas si vous changez de structure. Investir dans vos compétences est souvent le meilleur retour sur investissement pour un entrepreneur.',
    content: `Le CPF est alimenté chaque année à hauteur de <b>500€ par an</b> (800€ pour les travailleurs peu qualifiés), dans la limite de 5 000€ cumulés (8 000€ pour les peu qualifiés). En tant qu'entrepreneur indépendant ou salarié, ces droits sont actifs et consultables dès maintenant.<br>
<br>
<b>Formations éligibles au CPF</b><br>
• Formations certifiantes et diplômantes (comptabilité, management, langues, digital, data...)<br>
• Bilan de compétences (jusqu'à 2 000€ financés intégralement)<br>
• Validation des Acquis de l'Expérience (VAE)<br>
• Permis de conduire professionnel<br>
• Création et reprise d'entreprise (accompagnement BGUE)<br>
<br>
<b>Comment accéder à vos droits</b><br>
Rendez-vous sur <b>moncompteformation.gouv.fr</b> avec votre numéro de sécurité sociale. Consultez votre solde et recherchez des formations directement éligibles à 100% sur CPF.<br>
<br>
<b>Astuce</b><br>
Planifiez vos formations en début d'année pour bénéficier des droits fraîchement crédités. En cas de solde insuffisant, un co-financement est possible avec votre OPCO, votre Région, ou un reste à charge personnel.`,
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
      "Chaque facture émise par {{company_name}} doit comporter un ensemble de mentions légales précisément définies par le Code de Commerce et le Code Général des Impôts. L'absence d'une seule mention peut entraîner des amendes lors d'un contrôle fiscal et des litiges avec vos clients. La conformité de vos factures est aussi un signal de professionnalisme qui renforce la confiance de vos partenaires et clients.",
    content: `Voici les mentions obligatoires que chaque facture de <b>{{company_name}}</b> doit impérativement contenir :<br>
<br>
<b>Identification de l'émetteur</b><br>
• Numéro SIRET : <b>{{siret}}</b><br>
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
    id: 'common_rc_pro_couverture',
    category: 'Social',
    type: 'warning',
    priority: 2,
    title: 'RC Pro : êtes-vous couvert contre les risques de votre activité ?',
    summary:
      "La Responsabilité Civile Professionnelle vous protège contre les conséquences financières des dommages causés à des tiers dans le cadre de votre activité — erreur de conseil, oubli, retard ou accident. Sans cette couverture, vous seriez personnellement responsable sur l'ensemble de votre patrimoine. Pour certaines professions, elle est une obligation légale qui conditionne le droit d'exercer.",
    content: `La RC Pro est <b>légalement obligatoire</b> pour les activités suivantes :<br>
• Professions du bâtiment : artisans, architectes, maîtres d'œuvre (avec garantie décennale)<br>
• Professions médicales et paramédicales : médecins, infirmiers, kinés, ostéopathes...<br>
• Avocats, experts-comptables, commissaires aux comptes, notaires<br>
• Agents immobiliers et administrateurs de biens<br>
• Courtiers en assurance et conseillers en investissements financiers<br>
<br>
<b>Pour toutes les autres activités, elle est vivement recommandée</b><br>
En cas de dommage causé à un client (livrable défectueux, conseil inadapté, retard préjudiciable, accident chez le client), vous êtes personnellement engagé si vous n'êtes pas assuré. La RC Pro couvre les frais juridiques de défense et l'indemnisation des dommages.<br>
<br>
<b>Coûts indicatifs annuels</b><br>
• Consultant / développeur / créatif : 150€ à 500€/an<br>
• Coach / formateur : 200€ à 600€/an<br>
• BTP artisan : 500€ à 3 000€/an selon volume de travaux<br>
<br>
<b>Comment choisir</b><br>
Comparez au moins 3 devis en précisant votre secteur d'activité exact, votre CA prévisionnel et la nature de vos interventions (sur site client, à distance, avec manipulation de matériel tiers...).`,
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
    title:
      "CFE : vous bénéficiez de l'exonération totale pour votre première année",
    summary:
      "Bonne nouvelle : l'année de création de votre entreprise ({{creation_date}}), vous êtes totalement exonéré de Cotisation Foncière des Entreprises. Cette taxe locale annuelle, souvent oubliée par les nouveaux entrepreneurs, peut représenter plusieurs centaines voire milliers d'euros selon votre commune. Profitez de cette première année pour constituer une réserve, car la CFE sera due dès votre deuxième exercice.",
    content: `Votre entreprise créée le <b>{{creation_date}}</b> bénéficie de l'<b>exonération totale de CFE pour l'année en cours</b>.<br>
<br>
<b>Qu'est-ce que la CFE ?</b><br>
La Cotisation Foncière des Entreprises est un impôt local dû annuellement par toutes les entreprises — micro-entrepreneurs inclus — à partir de la deuxième année d'activité. Son montant est calculé sur la valeur locative cadastrale des locaux utilisés pour votre activité.<br>
<br>
<b>Montants indicatifs selon les communes</b><br>
• Petite commune (< 5 000 hab.) : 200€ à 500€/an<br>
• Ville moyenne : 400€ à 1 200€/an<br>
• Grande ville (Paris, Lyon, Marseille) : 800€ à 2 500€/an et plus<br>
<br>
<b>Ce que vous devez faire maintenant</b><br>
• Vérifier que votre immatriculation est bien enregistrée auprès du service des impôts des entreprises (SIE) de votre commune<br>
• Si vous travaillez depuis votre domicile, une cotisation minimum s'appliquera dès la deuxième année<br>
• Déclarez votre activité avant le <b>31 décembre</b> de cette année via l'espace professionnel sur impots.gouv.fr<br>
<br>
<b>À prévoir dès maintenant</b><br>
Provisionnez la CFE dans votre budget mensuel dès votre deuxième année. Vous recevrez votre avis d'imposition en automne avec un paiement exigible en décembre.`,
    sources: [
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23547',
        title: 'Cotisation Foncière des Entreprises — Service-Public.fr',
      },
    ],
  },
];

export default config;

import type { AuditConfigItem } from '../adapters/base.generator';

const config: AuditConfigItem[] = [
  {
    id: 'futur_tva_prevoyance_assurances',
    category: 'Social',
    type: 'information',
    priority: 3,
    title:
      'Prévoyance et assurances : construisez votre protection avant de vous lancer',
    summary:
      "En quittant le salariat pour vous lancer, vous perdez instantanément l'ensemble de la protection sociale financée par votre employeur : complémentaire santé, prévoyance, retraite complémentaire. Il est crucial d'anticiper ces coûts et de les intégrer à votre budget prévisionnel avant même votre premier jour d'activité. Une bonne couverture protège non seulement votre santé mais aussi la pérennité financière de votre projet en cas d'imprévu.",
    content: `En tant que futur entrepreneur, vous devez construire votre protection sociale de A à Z :<br>
<br>
<b>Mutuelle santé (complémentaire obligatoire)</b><br>
Les contrats TNS sont généralement plus coûteux que les contrats collectifs d'entreprise, mais couvrent mieux les besoins des indépendants. Comptez entre 80€ et 200€/mois selon votre profil et le niveau de garanties. Comparez des offres dédiées TNS avant votre premier jour d'activité pour ne pas vous retrouver sans couverture.<br>
<br>
<b>Prévoyance incapacité / invalidité / décès</b><br>
En cas d'arrêt maladie ou d'accident, la Sécurité Sociale des Indépendants verse des indemnités journalières très limitées (environ 20€/jour pour un micro-entrepreneur, avec un délai de carence de 3 jours). Une prévoyance complémentaire couvre la différence entre vos revenus habituels et les indemnités légales — indispensable dès que votre activité génère plus de 2 500€/mois.<br>
<br>
<b>Assurance Responsabilité Civile Professionnelle</b><br>
Obligatoire pour de nombreuses professions, fortement conseillée pour toutes. Elle couvre les erreurs, omissions et dommages causés dans le cadre de votre activité professionnelle. À souscrire avant votre premier client.<br>
<br>
<b>Assurance matériel professionnel</b><br>
Si vous utilisez du matériel coûteux (ordinateur, outillage, équipements), assurez-le séparément de votre assurance habitation. Votre assurance personnelle ne couvre généralement pas le matériel à usage professionnel.`,
    sources: [
      {
        url: 'https://talks.freelancerepublik.com/wemind-ou-alan-quelle-mutuelle-pour-les-freelances/',
        title: 'Mutuelles & assurances pour freelances — Freelance Republik',
      },
      {
        url: 'https://entreprendre.service-public.gouv.fr/vosdroits/F23442',
        title: 'Assurance RC Pro — Service-Public.fr',
      },
    ],
  },

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
    id: 'futur_optimisation_arebasee',
    category: 'ARE',
    type: 'success',
    priority: 1,
    title:
      'ARE ou ARCE : choisissez la meilleure option avant de quitter votre emploi',
    summary:
      "En tant que futur créateur d'entreprise issu du salariat, vous pouvez bénéficier des allocations chômage lors de votre lancement — une aide qui peut représenter plusieurs milliers d'euros par mois selon votre salaire actuel. Le choix entre l'ARE mensuelle (maintien progressif) et l'ARCE (capital immédiat à 60%) est l'une des décisions financières les plus importantes de votre lancement. Ce choix est définitif et doit impérativement être fait avant votre départ.",
    content: `<b>Option 1 — ARE (Aide au Retour à l'Emploi, maintien mensuel)</b><br>
Vos allocations sont maintenues chaque mois et réduites proportionnellement à vos revenus d'entrepreneur. Vous continuez à percevoir une partie de votre ARE tant que vous avez des droits restants et que vos revenus mensuels restent inférieurs à votre ancien salaire. Cette option est recommandée si votre activité démarre progressivement et que vous avez besoin d'un filet de sécurité mensuel.<br>
<br>
<b>Option 2 — ARCE (capital immédiat)</b><br>
Vous percevez <b>60% de vos droits ARE restants</b> en deux versements : 50% au démarrage de l'activité, 50% six mois plus tard. Recommandée si vous avez besoin d'un apport en capital initial (matériel, stock, communication, local). L'ARCE est imposable à l'IR l'année de perception.<br>
<br>
<b>Points clés avant de décider</b><br>
• Le choix ARE vs ARCE est <b>irrévocable une fois effectué</b><br>
• Inscrivez-vous à Pôle Emploi <b>avant ou le jour de votre fin de contrat</b> (un seul jour de retard = perte définitive de droits)<br>
• Avec l'ARE, chaque mois de revenus réduit l'allocation selon une formule Pôle Emploi complexe<br>
• Votre conseiller Timbr peut simuler le montant exact de vos droits et le scénario le plus avantageux selon votre situation`,
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
Limites : plafond de CA (77 700€ services / 188 700€ ventes), impossible de déduire vos frais réels, pas d'optimisation salaire/dividendes possible.<br>
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
• CA prévisionnel 30 000€ à 60 000€ → Micro ou EURL selon frais et besoin de protection<br>
• CA prévisionnel > 60 000€ → SASU ou EURL quasi systématiquement plus avantageux<br>
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
    id: 'futur_rc_pro_obligation',
    category: 'Social',
    type: 'warning',
    priority: 2,
    title: 'RC Pro : vérifiez votre obligation avant même votre premier client',
    summary:
      "Avant votre première prestation, vérifiez impérativement si votre activité impose une Responsabilité Civile Professionnelle obligatoire et souscrivez-en une si nécessaire. Sans couverture RC Pro, un seul incident professionnel peut engager l'ensemble de votre patrimoine personnel et mettre en péril votre activité naissante. Le coût d'une assurance est marginal comparé au risque financier qu'elle couvre en cas de sinistre.",
    content: `<b>Activités pour lesquelles la RC Pro est légalement obligatoire</b><br>
• Professions du bâtiment : artisans, architectes, maîtres d'œuvre, bureaux d'études techniques (avec garantie décennale)<br>
• Professions médicales et paramédicales : médecins, chirurgiens-dentistes, infirmiers, kinésithérapeutes, ostéopathes<br>
• Professions juridiques et financières : avocats, experts-comptables, notaires, commissaires aux comptes<br>
• Agents immobiliers, administrateurs de biens, syndics de copropriété<br>
• Courtiers en assurance, conseillers en investissements financiers<br>
• Agences de voyage, auto-écoles, centres de formation agréés<br>
<br>
<b>Activités pour lesquelles elle est fortement recommandée</b><br>
• Conseil et consulting (IT, stratégie, marketing, RH, management)<br>
• Développement web et logiciels<br>
• Graphisme, communication et production audiovisuelle<br>
• Formation professionnelle et coaching<br>
• Toute activité impliquant un contact régulier avec des clients ou du matériel tiers<br>
<br>
<b>Coûts indicatifs annuels</b><br>
• Consultant / développeur / créatif : 150€ à 500€/an<br>
• Coach / formateur : 200€ à 600€/an<br>
• BTP artisan : 500€ à 3 000€/an selon volume de travaux<br>
<br>
<b>Comment choisir</b><br>
Comparez au moins 3 devis en précisant votre activité exacte, votre CA prévisionnel et la nature de vos interventions. Des comparateurs en ligne (Hiscox, AXA Pro, Maif Pro...) proposent des devis instantanés.`,
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
];

export default config;

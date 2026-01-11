import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CompanyService {
  private readonly apiUrl =
    process.env.COMPANY_SEARCH_API_URL ||
    'https://recherche-entreprises.api.gouv.fr';

  /**
   * Search for a company by SIREN or SIRET
   */
  async searchCompany(query: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/search`, {
        params: {
          q: query,
        },
      });

      if (
        !response.data ||
        !response.data.results ||
        response.data.results.length === 0
      ) {
        throw new HttpException(
          'Aucune entreprise trouvée',
          HttpStatus.NOT_FOUND,
        );
      }

      // Return the first result with formatted data
      const company = response.data.results[0];

      return {
        siren: company.siren,
        siret: company.siege?.siret || company.siren,
        company_name:
          company.nom_complet ||
          company.nom_raison_sociale ||
          company.denomination,
        legal_form: company.nature_juridique,
        address: this.formatAddress(company.siege),
        creation_date: company.date_creation,
        activity: company.activite_principale,
        status: company.etat_administratif,
        employees: company.tranche_effectif_salarie,
        naf_code: company.activite_principale,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error searching company:', error);
      throw new HttpException(
        "Erreur lors de la recherche d'entreprise",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Format the address from the API response
   */
  private formatAddress(siege: any): string {
    if (!siege) return '';

    const parts = [
      siege.numero_voie,
      siege.type_voie,
      siege.libelle_voie,
      siege.complement_adresse,
      siege.code_postal,
      siege.libelle_commune,
    ].filter(Boolean);

    return parts.join(' ');
  }
}

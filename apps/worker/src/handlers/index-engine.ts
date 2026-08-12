// Handlers pour le calcul des indices (communautaire et officiel)
import { calculateFullGlobalIndex } from '../../../packages/index-engine/src/community-index';
import { calculateFullOfficialGlobalIndex, compareIndices } from '../../../packages/index-engine/src/official-index';
import { Env } from '../bindings/d1';

// Calculer et retourner l'indice communautaire mondial
export const calculateCommunityIndex = async (env: Env) => {
  try {
    const globalIndex = await calculateFullGlobalIndex(env.DB);
    return {
      success: true,
      data: globalIndex,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Échec du calcul de l\'indice communautaire',
      timestamp: new Date().toISOString(),
    };
  }
};

// Calculer et retourner l'indice officiel mondial
export const calculateOfficialIndex = async (env: Env) => {
  try {
    const officialIndex = await calculateFullOfficialGlobalIndex(env.DB);
    return {
      success: true,
      data: officialIndex,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Échec du calcul de l\'indice officiel',
      timestamp: new Date().toISOString(),
    };
  }
};

// Comparer les indices officiel et communautaire
export const compareCommunityAndOfficialIndices = async (env: Env) => {
  try {
    const [communityIndex, officialIndex] = await Promise.all([
      calculateFullGlobalIndex(env.DB),
      calculateFullOfficialGlobalIndex(env.DB),
    ]);

    const comparison = compareIndices(officialIndex, {
      value: communityIndex.value,
      countriesCount: communityIndex.countriesCount,
      totalReports: communityIndex.totalReports,
    });

    return {
      success: true,
      data: {
        communityIndex,
        officialIndex,
        comparison,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Échec de la comparaison des indices',
      timestamp: new Date().toISOString(),
    };
  }
};

// Mettre à jour les indices (appelé par un cron job)
export const updateIndices = async (env: Env) => {
  try {
    // Calculer les indices
    const communityIndex = await calculateFullGlobalIndex(env.DB);
    const officialIndex = await calculateFullOfficialGlobalIndex(env.DB);

    // Dans une implémentation réelle, on stockerait ces indices dans une table dédiée
    // pour un accès plus rapide et pour l'historique

    return {
      success: true,
      data: {
        communityIndex,
        officialIndex,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Échec de la mise à jour des indices',
      timestamp: new Date().toISOString(),
    };
  }
};
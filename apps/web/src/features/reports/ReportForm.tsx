import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Modal } from '../../components/ui';
import { useCountries } from '../../hooks/useCountries';
import { formatCurrency } from '../../utils/formatters';

interface ReportFormProps {
  onSubmit: (data: {
    countryIso2: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    ageRange?: string;
    tradition?: string;
    comment?: string;
  }) => Promise<void>;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { data: countries, isLoading, error } = useCountries();
  const [formData, setFormData] = useState({
    countryIso2: '',
    amount: '',
    currency: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    ageRange: '',
    tradition: '',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const ageRanges = ['3-5 ans', '6-8 ans', '9-12 ans', '13+ ans'];

  if (isLoading) return <div>Chargement des pays...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryIso2 = e.target.value;
    const country = countries?.find(c => c.iso2 === countryIso2);
    setFormData(prev => ({
      ...prev,
      countryIso2,
      currency: country?.currency_code || '',
      tradition: country?.tradition_fr || '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await onSubmit({
        countryIso2: formData.countryIso2,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        month: formData.month,
        year: formData.year,
        ageRange: formData.ageRange || undefined,
        tradition: formData.tradition || undefined,
        comment: formData.comment || undefined,
      });
      setIsSuccessModalOpen(true);
    } catch (err) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📝 Déclarer un Montant</h1>
      <p className="text-lg mb-8">
        Contribuez à l'indice mondial en déclarant le montant laissé par la Petite Souris 
        (ou équivalent local) pour une dent de lait. Chaque déclaration validée vous rapporte 
        <strong>10 à 50 CROQ Credits</strong> !
      </p>

      <Card title="Formulaire de Déclaration">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pays */}
          <div>
            <label htmlFor="countryIso2" className="block text-sm font-medium mb-1">
              Pays *
            </label>
            <select
              id="countryIso2"
              name="countryIso2"
              value={formData.countryIso2}
              onChange={handleCountryChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Sélectionnez un pays</option>
              {countries?.map(country => (
                <option key={country.iso2} value={country.iso2}>
                  {country.name_fr} ({country.iso2})
                </option>
              ))}
            </select>
          </div>

          {/* Montant */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Montant *
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                required
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Ex: 5.00"
              />
              <span className="p-2 bg-gray-100 rounded-lg">{formData.currency || '€'}</span>
            </div>
          </div>

          {/* Mois et Année */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="month" className="block text-sm font-medium mb-1">
                Mois *
              </label>
              <select
                id="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString('fr-FR', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-1">
                Année *
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tranche d'âge */}
          <div>
            <label htmlFor="ageRange" className="block text-sm font-medium mb-1">
              Tranche d'âge (optionnel)
            </label>
            <select
              id="ageRange"
              name="ageRange"
              value={formData.ageRange}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Non spécifié</option>
              {ageRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Tradition */}
          <div>
            <label htmlFor="tradition" className="block text-sm font-medium mb-1">
              Tradition (optionnel)
            </label>
            <input
              type="text"
              id="tradition"
              name="tradition"
              value={formData.tradition}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Ex: La Petite Souris"
            />
          </div>

          {/* Commentaire */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Commentaire (optionnel)
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Ma fille a perdu sa première dent !"
              maxLength={500}
            />
            <p className="text-xs text-[var(--secondary)]">Max 500 caractères</p>
          </div>

          {/* Avertissements */}
          <div className="bg-yellow-50 p-4 rounded-lg text-sm">
            <p className="font-bold mb-2">⚠️ Important :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ne <strong>pas inclure</strong> de données personnelles (nom, âge exact, adresse, etc.).</li>
              <li>Les déclarations sont <strong>anonymes</strong> et modérées.</li>
              <li>Une déclaration = <strong>10 à 50 CROQ Credits</strong> (selon la qualité).</li>
              <li>Les montants <strong>aberrants</strong> seront rejetés.</li>
            </ul>
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la déclaration'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)} className="flex-1">
              Annuler
            </Button>
          </div>

          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
        </form>
      </Card>

      {/* Modal de succès */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          navigate('/countries');
        }}
        title="Déclaration envoyée !"
      >
        <p className="mb-4">
          Merci pour votre contribution ! Votre déclaration a été envoyée avec succès et sera 
          validée sous 24-48h.
        </p>
        <p className="mb-4">
          Vous allez recevoir <strong>10 à 50 CROQ Credits</strong> une fois la déclaration validée.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => {
            setIsSuccessModalOpen(false);
            navigate('/');
          }}
          >
            Retour à l'accueil
          </Button>
          <Button onClick={() => {
            setIsSuccessModalOpen(false);
            navigate('/countries');
          }}
          >
            Voir les pays
          </Button>
        </div>
      </Modal>
    </div>
  );
};
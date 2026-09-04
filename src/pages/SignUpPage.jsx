import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { API } from '../api/axiosInstance';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      role_id: ''
    }
  });

  const selectedRoleId = watch('role_id');
  const selectedRole = roles.find((r) => String(r.id) === String(selectedRoleId));
  const isStore = selectedRole?.code === 'store' || selectedRole?.name?.toLowerCase().includes('store') || selectedRole?.name?.toLowerCase().includes('mağaza');

  useEffect(() => {
    API.get('/roles')
      .then((res) => {
        const fetchedRoles = res.data;
        setRoles(fetchedRoles);
        // Customer is selected by default
        const customerRole = fetchedRoles.find((r) => r.code === 'customer' || r.name.toLowerCase().includes('müşteri') || r.name.toLowerCase().includes('customer'));
        if (customerRole) {
          setValue('role_id', customerRole.id);
        } else if (fetchedRoles.length > 0) {
          setValue('role_id', fetchedRoles[0].id);
        }
      })
      .catch((err) => {
        console.error('Roles fetch error:', err);
        toast.error('Roller yüklenirken bir hata oluştu.');
      })
      .finally(() => {
        setLoadingRoles(false);
      });
  }, [setValue]);

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };

      if (isStore && data.store) {
        payload.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account
        };
      }

      await API.post('/signup', payload);
      toast.warning('You need to click link in email to activate your account!', {
        autoClose: 6000
      });
      navigate(-1);
    } catch (error) {
      console.error('Sign up error:', error);
      const msg = error.response?.data?.message || 'Kayıt sırasında bir hata oluştu.';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Kayıt Ol (Sign Up)
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          E-Ticaret dünyasına hoş geldiniz
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad (Name) *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('name', {
                    required: 'Ad Soyad zorunludur.',
                    minLength: {
                      value: 3,
                      message: 'Ad Soyad en az 3 karakter olmalıdır.'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-posta (Email) *
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  {...register('email', {
                    required: 'E-posta adresi zorunludur.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Geçerli bir e-posta adresi giriniz.'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="ornek@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şifre (Password) *
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('password', {
                    required: 'Şifre zorunludur.',
                    minLength: {
                      value: 8,
                      message: 'Şifre en az 8 karakter olmalıdır.'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
                      message: 'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve özel karakter içermelidir.'
                    }
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Password Validation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şifre Tekrarı (Confirm Password) *
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register('passwordConfirm', {
                    required: 'Şifre tekrarı zorunludur.',
                    validate: (value) =>
                      value === passwordValue || 'Şifreler birbiriyle eşleşmiyor.'
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="mt-1 text-xs text-red-600">{errors.passwordConfirm.message}</p>
              )}
            </div>

            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rol (Role) *
              </label>
              <div className="mt-1">
                {loadingRoles ? (
                  <p className="text-sm text-gray-500">Roller yükleniyor...</p>
                ) : (
                  <select
                    {...register('role_id', { required: 'Lütfen bir rol seçiniz.' })}
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {errors.role_id && (
                <p className="mt-1 text-xs text-red-600">{errors.role_id.message}</p>
              )}
            </div>

            {/* Conditional Store Fields */}
            {isStore && (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <h3 className="text-md font-semibold text-gray-800">
                  Mağaza Bilgileri (Store Details)
                </h3>

                {/* Store Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mağaza Adı (Store Name) *
                  </label>
                  <input
                    type="text"
                    {...register('store.name', {
                      required: 'Mağaza adı zorunludur.',
                      minLength: {
                        value: 3,
                        message: 'Mağaza adı en az 3 karakter olmalıdır.'
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Mağazam A.Ş."
                  />
                  {errors.store?.name && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.store.name.message}
                    </p>
                  )}
                </div>

                {/* Store Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mağaza Telefonu (Store Phone) *
                  </label>
                  <input
                    type="text"
                    {...register('store.phone', {
                      required: 'Telefon numarası zorunludur.',
                      pattern: {
                        value: /^(\+90|0)?[5][0-9]{9}$/,
                        message: 'Geçerli bir Türkiye telefon numarası giriniz (örn: 05xxxxxxxxx).'
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="05321234567"
                  />
                  {errors.store?.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.store.phone.message}
                    </p>
                  )}
                </div>

                {/* Store Tax ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vergi No (Tax ID) * (Format: TXXXXVXXXXXX)
                  </label>
                  <input
                    type="text"
                    {...register('store.tax_no', {
                      required: 'Vergi No zorunludur.',
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: 'Vergi no "TXXXXVXXXXXX" formatında olmalıdır (örn: T1234V567890).'
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="T1234V567890"
                  />
                  {errors.store?.tax_no && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.store.tax_no.message}
                    </p>
                  )}
                </div>

                {/* Store Bank Account */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Banka Hesabı IBAN (Bank Account) *
                  </label>
                  <input
                    type="text"
                    {...register('store.bank_account', {
                      required: 'IBAN zorunludur.',
                      pattern: {
                        value: /^TR[0-9]{24}$/i,
                        message: 'Geçerli bir Türkiye IBAN adresi giriniz (örn: TR... 26 karakter).'
                      }
                    })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="TR000000000000000000000000"
                  />
                  {errors.store?.bank_account && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.store.bank_account.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Kaydediliyor...
                  </span>
                ) : (
                  'Kayıt Ol'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

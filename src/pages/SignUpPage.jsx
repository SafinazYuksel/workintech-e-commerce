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

  useEffect(() => {
    API.get('/roles')
      .then((res) => {
        const fetchedRoles = res.data;
        // Filter out 'store' / 'mağaza' role so only Customer and Admin remain
        const filteredRoles = fetchedRoles.filter(
          (r) =>
            !r.code?.toLowerCase().includes('store') &&
            !r.name?.toLowerCase().includes('mağaza') &&
            !r.name?.toLowerCase().includes('store')
        );

        setRoles(filteredRoles.length > 0 ? filteredRoles : fetchedRoles);

        // Default role is Customer
        const customerRole = fetchedRoles.find(
          (r) =>
            r.code === 'customer' ||
            r.name?.toLowerCase().includes('müşteri') ||
            r.name?.toLowerCase().includes('customer')
        );

        if (customerRole) {
          setValue('role_id', customerRole.id);
        } else if (filteredRoles.length > 0) {
          setValue('role_id', filteredRoles[0].id);
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
        role_id: data.role_id || 3
      };

      await API.post('/signup', payload);
      toast.warning('Account created! Please check your email to activate your account.', {
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Ad Soyad (Name) *
                </label>
                <span className="text-xs text-gray-500 font-normal">
                  En az 3 karakter
                </span>
              </div>
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Şifre (Password) *
                </label>
                <span className="text-xs text-gray-500 font-normal">
                  En az 8 karakter
                </span>
              </div>
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
                  placeholder="En az 8 karakter (örn: Abc1234!)"
                />
              </div>
              <p className="mt-1 text-[11px] text-gray-500 font-medium">
                * Şifreniz en az 8 karakter olmalı; 1 büyük harf, 1 küçük harf, 1 rakam ve 1 özel karakter içermelidir.
              </p>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
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

            {/* Hidden Role Input - Automatically assigned as Customer */}
            <input type="hidden" {...register('role_id')} />



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

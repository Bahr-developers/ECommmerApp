// eslint-disable-next-line import/no-extraneous-dependencies
import { useQuery } from '@tanstack/react-query';

import { UserUtils } from 'src/utils/user.utils';
import { LanguageUtils } from 'src/utils/language.utils';
import { CategoryUtils } from 'src/utils/category.utils';
import { TranslateUtils } from 'src/utils/translate.utils';

import { QueryKey } from './QueryKey';

export const useLanguage = () =>
  useQuery({
    queryKey: [QueryKey.language],
    queryFn: LanguageUtils.getLanguage,
  });

export const useTranslate = () =>
  useQuery({
    queryKey: [QueryKey.translate],
    queryFn: TranslateUtils.getTranslate,
  });

export const useSingleUser = () =>
  useQuery({
    queryKey: [QueryKey.singleUser],
    queryFn: UserUtils.getSingleUser,
  });

export const useCategory = () =>
  useQuery({
    queryKey: [QueryKey.category],
    queryFn: CategoryUtils.getCategory,
  });

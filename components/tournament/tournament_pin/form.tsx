'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Check as CheckIcon } from 'lucide-react';
import formSchema from './schema';

export default function TournamentPinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // function handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {}

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-start w-full">
          <div className="text-lg ml-2 mb-2 font-bold mt-4">
            Join med PIN-kode
          </div>
          <div className="flex flex-row justify-between items-center gap-2 w-full max-w-md h-14">
            <FormField
              control={form.control}
              name={'one'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full text-center text-2xl font-medium flex-1"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={'two'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full text-center text-2xl font-medium flex-1"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={'three'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full text-center text-2xl font-medium flex-1"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={'four'}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-full text-center text-2xl font-medium flex-1"
                        type="text"
                        maxLength={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="h-full flex items-center justify-center flex-1"
              variant="default"
              size="icon"
            >
              <CheckIcon size={36} />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

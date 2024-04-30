'use client';


import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import loginUser from '../(actions)/user';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
  user_id: z.string(),
  password: z.string()
})

const Login = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      password: ''
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await loginUser(values.user_id, values.password)
      router.push('/');
    } catch (error) {
      // TODO: Add toast when implemented in the app
      console.error(error)
    } finally {
      form.reset({
        user_id: '',
        password: ''
      })
    }
  }

  return (
    <div className='mx-auto mt-20'>
      <Card className='max-w-md w-full mx-auto'>
        <CardHeader>
          <CardTitle>
            <Logo className='fill-black dark:fill-white w-44 mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='user_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Brukernavn
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Passord
                    </FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                  </FormItem>
              )}
              />

              <Button className='w-full' type='submit'>
                  Logg inn
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};


export default Login;
